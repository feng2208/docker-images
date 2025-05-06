# docker images
从 docker hub 上拉取常用的镜像上传到 github 的 ghcr.io。

- 可能需要把以下加入到 `hosts` 文件。
  ```
  140.82.112.34 ghcr.io
  151.101.184.133 pkg-containers.githubusercontent.com
  ```
- 如果想要其他镜像请提 issue，或者直接 fork 本 repo，启用 actions，然后在 hub 目录新建文件，内容为镜像的名称及 tag，请参考 [hub/nginx](https://github.com/feng2208/docker-images/blob/main/hub/nginx)。

镜像列表：
