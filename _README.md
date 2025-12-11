# docker images
从 docker hub 上拉取常用的镜像上传到 github 的 ghcr.io。


- 如果想要其他镜像请提 issue，或者直接 fork 本 repo，启用 actions，然后在 hub 目录新建文件，内容为镜像的名称及 tag，如：`grafana/grafana:12.0.0`或`ubuntu:24.04`。
- github 的镜像域名: `pkg-containers.githubusercontent.com`
- 用 cloudflare 加速。新建一个 pages 应用然后上传 docker-mirror，支持多个镜像库。拉取时用
    - `app-name.pages.dev/cr/docker/nginx:1.28.0` 或者
    - `app-name.pages.dev/cr/ghcr.io/feng2208/nginx:1.28.0`

## 镜像列表
