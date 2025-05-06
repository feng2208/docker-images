# docker images
从 docker hub 上拉取常用的镜像上传到 github 的 ghcr.io。

- 可能需要把以下加入到 `hosts` 文件。
  ```
  140.82.112.34 ghcr.io
  151.101.184.133 pkg-containers.githubusercontent.com
  ```
- 如果想要其他镜像请提 issue，或者直接 fork 本 repo，启用 actions，然后在 hub 目录新建文件，内容为镜像的名称及 tag，请参考 [hub/nginx](https://github.com/feng2208/docker-images/blob/main/hub/nginx)。

镜像列表：
- [grafana/grafana](https://github.com/feng2208/docker-images/pkgs/container/grafana%2Fgrafana)
```ruby
docker pull ghcr.io/feng2208/grafana/grafana:12.0.0
docker pull registry.gitlab.com/feng2208/a/grafana/grafana:12.0.0
```

- [mariadb](https://github.com/feng2208/docker-images/pkgs/container/mariadb)
```ruby
docker pull ghcr.io/feng2208/mariadb:11.4.5
docker pull registry.gitlab.com/feng2208/a/mariadb:11.4.5
```

- [mysql](https://github.com/feng2208/docker-images/pkgs/container/mysql)
```ruby
docker pull ghcr.io/feng2208/mysql:8.4.3
docker pull registry.gitlab.com/feng2208/a/mysql:8.4.3
```

- [nextcloud](https://github.com/feng2208/docker-images/pkgs/container/nextcloud)
```ruby
docker pull ghcr.io/feng2208/nextcloud:31.0.4
docker pull registry.gitlab.com/feng2208/a/nextcloud:31.0.4
```

- [nginx](https://github.com/feng2208/docker-images/pkgs/container/nginx)
```ruby
docker pull ghcr.io/feng2208/nginx:1.26.3
docker pull registry.gitlab.com/feng2208/a/nginx:1.26.3
```

- [php](https://github.com/feng2208/docker-images/pkgs/container/php)
```ruby
docker pull ghcr.io/feng2208/php:8.4.6-cli
docker pull registry.gitlab.com/feng2208/a/php:8.4.6-cli
```

- [postgres](https://github.com/feng2208/docker-images/pkgs/container/postgres)
```ruby
ghcr.io/feng2208/postgres:17.4
```

- [python](https://github.com/feng2208/docker-images/pkgs/container/python)
```ruby
ghcr.io/feng2208/python:3.12.8
```

- [redis](https://github.com/feng2208/docker-images/pkgs/container/redis)
```ruby
ghcr.io/feng2208/redis:7.4.2
```

- [ubuntu](https://github.com/feng2208/docker-images/pkgs/container/ubuntu)
```ruby
docker pull ghcr.io/feng2208/ubuntu:24.04
docker pull registry.gitlab.com/feng2208/a/ubuntu:24.04
```

