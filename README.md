# docker images
从 docker hub 上拉取常用的镜像上传到 github 的 ghcr.io。


- 如果想要其他镜像请提 issue，或者直接 fork 本 repo，启用 actions，然后在 hub 目录新建文件，内容为镜像的名称及 tag，如：`grafana/grafana:12.0.0`或`ubuntu:24.04`。
- github 的镜像域名: `pkg-containers.githubusercontent.com`
- 用 cloudflare 加速。新建一个 pages 应用然后上传 docker-mirror，支持多个镜像库。拉取时用
    - `app-name.pages.dev/cr/docker/nginx:1.28.0` 或者
    - `app-name.pages.dev/cr/ghcr.io/feng2208/nginx:1.28.0`

## 镜像列表
### [adguardhome](https://github.com/feng2208/docker-images/pkgs/container/adguardhome)

adguard/adguardhome
```ruby
docker pull ghcr.io/feng2208/adguardhome:v0.107.64
docker pull registry.gitlab.com/feng2208/a/adguardhome:v0.107.64
```

### [gemini-cli](https://github.com/feng2208/docker-images/pkgs/container/gemini-cli)

us-docker.pkg.dev/gemini-code-dev/gemini-cli/sandbox
```ruby
docker pull ghcr.io/feng2208/gemini-cli:0.21.2
docker pull registry.gitlab.com/feng2208/a/gemini-cli:0.21.2
```

### [grafana](https://github.com/feng2208/docker-images/pkgs/container/grafana)

grafana/grafana
```ruby
docker pull ghcr.io/feng2208/grafana:12.2.0
docker pull registry.gitlab.com/feng2208/a/grafana:12.2.0
```

### [mariadb](https://github.com/feng2208/docker-images/pkgs/container/mariadb)

mariadb
```ruby
docker pull ghcr.io/feng2208/mariadb:11.4.5
docker pull registry.gitlab.com/feng2208/a/mariadb:11.4.5
```

### [mysql](https://github.com/feng2208/docker-images/pkgs/container/mysql)

mysql
```ruby
docker pull ghcr.io/feng2208/mysql:8.4.3
docker pull registry.gitlab.com/feng2208/a/mysql:8.4.3
```

### [nextcloud](https://github.com/feng2208/docker-images/pkgs/container/nextcloud)

nextcloud
```ruby
docker pull ghcr.io/feng2208/nextcloud:31.0.4
docker pull registry.gitlab.com/feng2208/a/nextcloud:31.0.4
```

### [nginx](https://github.com/feng2208/docker-images/pkgs/container/nginx)

nginx
```ruby
docker pull ghcr.io/feng2208/nginx:1.28.0
docker pull registry.gitlab.com/feng2208/a/nginx:1.28.0
```

### [php](https://github.com/feng2208/docker-images/pkgs/container/php)

php
```ruby
docker pull ghcr.io/feng2208/php:8.4.6-cli
docker pull registry.gitlab.com/feng2208/a/php:8.4.6-cli
```

### [postgres](https://github.com/feng2208/docker-images/pkgs/container/postgres)

postgres
```ruby
docker pull ghcr.io/feng2208/postgres:17.4
docker pull registry.gitlab.com/feng2208/a/postgres:17.4
```

### [python](https://github.com/feng2208/docker-images/pkgs/container/python)

python
```ruby
docker pull ghcr.io/feng2208/python:3.13.3
docker pull registry.gitlab.com/feng2208/a/python:3.13.3
```

### [redis](https://github.com/feng2208/docker-images/pkgs/container/redis)

redis
```ruby
docker pull ghcr.io/feng2208/redis:7.4.3
docker pull registry.gitlab.com/feng2208/a/redis:7.4.3
```

### [ubuntu](https://github.com/feng2208/docker-images/pkgs/container/ubuntu)

ubuntu
```ruby
docker pull ghcr.io/feng2208/ubuntu:24.04
docker pull registry.gitlab.com/feng2208/a/ubuntu:24.04
```

