const DEFAULT_REGISTRY = 'dreg.global.ssl.fastly.net';
const DOCKER_HUB_AUTH_URL = 'https://dauth.global.ssl.fastly.net/token';
const DOCKER_HUB_SERVICE = 'registry.docker.io';

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        // Token endpoint - must be before /v2/ check
        if (path === '/token') {
            return handleToken(request, url);
        }

        // Docker client ping - return 401 to trigger auth flow
        if (path === '/v2' || path === '/v2/') {
            // Check if client has Authorization header
            const authHeader = request.headers.get('Authorization');
            if (authHeader) {
                // Client is authenticated, return 200
                return new Response('{}', {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Docker-Distribution-Api-Version': 'registry/2.0'
                    }
                });
            }
            // No auth, return 401 to trigger token fetch
            return new Response('{"errors":[{"code":"UNAUTHORIZED","message":"authentication required"}]}', {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Docker-Distribution-Api-Version': 'registry/2.0',
                    'Www-Authenticate': `Bearer realm="${url.origin}/token",service="docker-mirror"`
                }
            });
        }

        // Proxy requests
        if (path.startsWith('/v2/cr/')) {
            return handleProxy(request, url);
        }

        return new Response('Not Found', { status: 404 });
    },
};

// Helper: Parse registry and repository from path
// Input: /v2/cr/<registry>/<repo...>/<action>
// Output: { registry, repo, upstreamPath, registryAlias }
function parseProxyPath(path) {
    // Remove /v2/cr/
    const parts = path.substring(7).split('/');
    if (parts.length < 2) return null;

    const registryAlias = parts[0];
    let registry = registryAlias;

    // Handle /manifests/, /blobs/, /tags/ to stop repo parsing
    let actionIndex = -1;
    const actions = ['manifests', 'blobs', 'tags', 'referrers'];

    for (let i = 1; i < parts.length; i++) {
        if (actions.includes(parts[i])) {
            actionIndex = i;
            break;
        }
    }

    if (actionIndex === -1) {
        return null;
    }

    let repoParts = parts.slice(1, actionIndex);
    let repo = repoParts.join('/');
    const restPath = parts.slice(actionIndex).join('/');

    // Keep original repo for scope generation
    const originalRepo = repo;

    if (registryAlias === 'docker') {
        registry = DEFAULT_REGISTRY;
        if (!repo.includes('/')) {
            repo = 'library/' + repo;
        }
    }

    const upstreamPath = `/v2/${repo}/${restPath}`;
    return { registry, repo, upstreamPath, registryAlias, originalRepo };
}

async function handleToken(request, url) {
    const scope = url.searchParams.get('scope');
    const service = url.searchParams.get('service');

    // If no scope, just return an empty token (for /v2/ ping auth)
    if (!scope) {
        // Generate a simple token for the ping
        return new Response(JSON.stringify({
            token: '',
            access_token: '',
            expires_in: 3600,
            issued_at: new Date().toISOString()
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Scope format: repository:cr/<registry>/<repo>:pull
    const scopeParts = scope.split(':');
    if (scopeParts.length < 3 || scopeParts[0] !== 'repository') {
        return new Response(JSON.stringify({ error: 'invalid scope format' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const pathInScope = scopeParts[1]; // cr/docker/nginx
    const actions = scopeParts.slice(2).join(':');

    if (!pathInScope.startsWith('cr/')) {
        return new Response(JSON.stringify({ error: 'invalid scope: missing cr/ prefix' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const parts = pathInScope.substring(3).split('/');
    if (parts.length < 2) {
        return new Response(JSON.stringify({ error: 'invalid scope: missing registry or repo' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const registryAlias = parts[0];
    let registry = registryAlias;
    let repo = parts.slice(1).join('/');

    if (registryAlias === 'docker') {
        registry = DEFAULT_REGISTRY;
        if (!repo.includes('/')) {
            repo = 'library/' + repo;
        }
    }

    let authUrl = '';
    let upstreamService = '';

    if (registry === DEFAULT_REGISTRY) {
        authUrl = DOCKER_HUB_AUTH_URL;
        upstreamService = DOCKER_HUB_SERVICE;
    } else {
        // Discovery: GET /v2/ on upstream to get auth info
        try {
            const resp = await fetch(`https://${registry}/v2/`, {
                method: 'GET',
                redirect: 'follow'
            });
            if (resp.status === 401) {
                const authHeader = resp.headers.get('Www-Authenticate');
                if (authHeader) {
                    const realmMatch = authHeader.match(/realm="([^"]+)"/);
                    const serviceMatch = authHeader.match(/service="([^"]+)"/);
                    if (realmMatch) authUrl = realmMatch[1];
                    if (serviceMatch) upstreamService = serviceMatch[1];
                }
            }
        } catch (e) {
            console.error('Failed to discover auth:', e);
        }
    }

    if (!authUrl) {
        return new Response(JSON.stringify({ error: 'upstream auth endpoint not found for ' + registry }), {
            status: 502,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Request token from upstream
    const upstreamScope = `repository:${repo}:${actions}`;
    const tokenUrl = new URL(authUrl);
    if (upstreamService) tokenUrl.searchParams.set('service', upstreamService);
    tokenUrl.searchParams.set('scope', upstreamScope);

    // Forward Authorization header for private repos (Basic auth)
    const upstreamHeaders = new Headers();
    const clientAuth = request.headers.get('Authorization');
    if (clientAuth && clientAuth.toLowerCase().startsWith('basic ')) {
        upstreamHeaders.set('Authorization', clientAuth);
    }

    const tokenResp = await fetch(tokenUrl.toString(), {
        headers: upstreamHeaders
    });

    // Handle 429 rate limit
    if (tokenResp.status === 429) {
        return new Response(JSON.stringify({
            errors: [{
                code: "TOOMANYREQUESTS",
                message: "You have reached your token pull rate limit. You may increase the limit by authenticating and upgrading: https://www.docker.com/increase-rate-limits"
            }]
        }), {
            status: 429,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (!tokenResp.ok) {
        const errorText = await tokenResp.text();
        return new Response(errorText, {
            status: tokenResp.status,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const data = await tokenResp.json();
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    });
}

async function handleProxy(request, url) {
    const parsed = parseProxyPath(url.pathname);
    if (!parsed) {
        return new Response('Invalid path', { status: 400 });
    }

    const { registry, upstreamPath, registryAlias, originalRepo } = parsed;
    const upstreamUrl = `https://${registry}${upstreamPath}`;

    // Create clean headers for upstream request
    const headers = new Headers();

    // Copy essential headers
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
        headers.set('Authorization', authHeader);
    }

    // Copy Accept headers (important for manifest negotiation)
    const accept = request.headers.get('Accept');
    if (accept) {
        headers.set('Accept', accept);
    }

    // Copy User-Agent
    const ua = request.headers.get('User-Agent');
    if (ua) {
        headers.set('User-Agent', ua);
    }

    const resp = await fetch(upstreamUrl, {
        method: request.method,
        headers: headers,
        body: request.body,
        redirect: 'follow'
    });

    // Handle 401 - rewrite auth challenge to point to our token endpoint
    if (resp.status === 401) {
        const authHeader = resp.headers.get('Www-Authenticate');
        if (authHeader) {
            // Build our scope: cr/<registry>/<repo>
            const ourScope = `repository:cr/${registryAlias}/${originalRepo}:pull`;

            // Use our own service name for consistency
            const newAuth = `Bearer realm="${url.origin}/token",service="docker-mirror",scope="${ourScope}"`;

            const newHeaders = new Headers();
            newHeaders.set('Content-Type', 'application/json');
            newHeaders.set('Docker-Distribution-Api-Version', 'registry/2.0');
            newHeaders.set('Www-Authenticate', newAuth);

            return new Response('{"errors":[{"code":"UNAUTHORIZED","message":"authentication required"}]}', {
                status: 401,
                headers: newHeaders
            });
        }
    }
    // Handle 429 rate limit - convert to proper JSON response
    if (resp.status === 429) {
        return new Response(JSON.stringify({
            errors: [{
                code: "TOOMANYREQUESTS",
                message: "You have reached your pull rate limit. You may increase the limit by authenticating and upgrading: https://www.docker.com/increase-rate-limits"
            }]
        }), {
            status: 429,
            headers: {
                'Content-Type': 'application/json',
                'Docker-Distribution-Api-Version': 'registry/2.0'
            }
        });
    }

    // For successful responses, return as-is
    return resp;
}

