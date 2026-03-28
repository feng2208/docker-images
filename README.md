# docker images
从 docker hub 上拉取常用的镜像上传到 github 的 ghcr.io。


- 如果想要其他镜像请提 issue，或者直接 fork 本 repo，启用 actions，然后在 hub 目录新建文件，内容为镜像的名称及 tag，如：`grafana/grafana:12.0.0`或`ubuntu:24.04`。
- github 的镜像域名: `pkg-containers.githubusercontent.com`
- 用 cloudflare 加速。新建一个 pages 应用然后上传 docker-mirror，支持多个镜像库。拉取时用
    - `app-name.pages.dev/cr/docker/nginx:1.28.0` 或者
    - `app-name.pages.dev/cr/ghcr.io/feng2208/nginx:1.28.0`

## 镜像列表
### [adguardhome](https://github.com/feng2208/docker-images/pkgs/container/adguardhome)

adguard/adguardhome:v0.107.73
```ruby
docker pull ghcr.io/feng2208/adguardhome:v0.107.73
docker pull registry.gitlab.com/feng2208/a/adguardhome:v0.107.73
```

### [gemini-cli](https://github.com/feng2208/docker-images/pkgs/container/gemini-cli)

us-docker.pkg.dev/gemini-code-dev/gemini-cli/sandbox:0.33.2
```ruby
docker pull ghcr.io/feng2208/gemini-cli:0.33.2
docker pull registry.gitlab.com/feng2208/a/gemini-cli:0.33.2
```

### [grafana](https://github.com/feng2208/docker-images/pkgs/container/grafana)

grafana/grafana:12.4.2
```ruby
docker pull ghcr.io/feng2208/grafana:12.4.2
docker pull registry.gitlab.com/feng2208/a/grafana:12.4.2
```

### [mariadb](https://github.com/feng2208/docker-images/pkgs/container/mariadb)

mariadb:11.8.6
```ruby
docker pull ghcr.io/feng2208/mariadb:11.8.6
docker pull registry.gitlab.com/feng2208/a/mariadb:11.8.6
```

### [mysql](https://github.com/feng2208/docker-images/pkgs/container/mysql)

mysql:8.4.8
```ruby
docker pull ghcr.io/feng2208/mysql:8.4.8
docker pull registry.gitlab.com/feng2208/a/mysql:8.4.8
```

### [nextcloud](https://github.com/feng2208/docker-images/pkgs/container/nextcloud)

nextcloud:33.0.1
```ruby
docker pull ghcr.io/feng2208/nextcloud:33.0.1
docker pull registry.gitlab.com/feng2208/a/nextcloud:33.0.1
```

### [nginx](https://github.com/feng2208/docker-images/pkgs/container/nginx)

nginx:1.28.3
```ruby
docker pull ghcr.io/feng2208/nginx:1.28.3
docker pull registry.gitlab.com/feng2208/a/nginx:1.28.3
```

### [php](https://github.com/feng2208/docker-images/pkgs/container/php)

php:8.4.19
```ruby
docker pull ghcr.io/feng2208/php:8.4.19
docker pull registry.gitlab.com/feng2208/a/php:8.4.19
```

### [postgres](https://github.com/feng2208/docker-images/pkgs/container/postgres)

postgres:18.3
```ruby
docker pull ghcr.io/feng2208/postgres:18.3
docker pull registry.gitlab.com/feng2208/a/postgres:18.3
```

### [python](https://github.com/feng2208/docker-images/pkgs/container/python)

python:3.14.3
```ruby
docker pull ghcr.io/feng2208/python:3.14.3
docker pull registry.gitlab.com/feng2208/a/python:3.14.3
```

### [redis](https://github.com/feng2208/docker-images/pkgs/container/redis)

redis:8.6.2
```ruby
docker pull ghcr.io/feng2208/redis:8.6.2
docker pull registry.gitlab.com/feng2208/a/redis:8.6.2
```

### [ubuntu](https://github.com/feng2208/docker-images/pkgs/container/ubuntu)

ubuntu:24.04
```ruby
docker pull ghcr.io/feng2208/ubuntu:24.04
docker pull registry.gitlab.com/feng2208/a/ubuntu:24.04
```

