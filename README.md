# Gallery

一个单文件的相册浏览程序，可以作为摄影爱好者的个人作品展示网站，又或是 NAS 上浏览图库的工具

## 安装/部署

### 本地编译

编译要求：

 - `go` ≥ 1.23
 - `nodejs` 建议用 22 或更高版本（React 19 能兼容的版本应该就可以，需要自行测试）

*如果上述环境你不方便准备，可以使用 Docker 编译，见文档下文*

macOS/Linux 用户可以直接用 `make` 命令编译整个项目，编译后的可执行程序在 `bin/gallery`。如果需要单独构建前端或者后端，或者是 Windows 用户，可以参考下面的步骤：

**单独构建前端：**

macOS/Linux:

```bash
make frontend
```

Windows:

```bat
cd ui
npm install && npm run build
```

**单独构建后端：**

```bash
make backend
```

Windows:
```bat
go build -o bin/gallery ./cmd/server
```

### Docker

使用 Docker 编译的话只需要执行 `./docker-build.sh` 即可。

如果想指定镜像名，可以通过在项目根目录添加 `.env` 文件，并在里面添加：

```
IMG_NAME=<YOUR_IMAGE_NAME>
```

## 配置

配置只有两个：本地图片路径 `IMG_DIR` 和监听端口 `PORT`，通过环境变量指定即可。

其中 `IMG_DIR` 是必传的，`PORT` 如果不传则默认监听 `9394`。

**图片必须放在 `IMG_DIR` 下的子文件夹，一个文件夹表示一个图集；暂时不支持子图集，如果有需要可以提 issue 说明下使用场景**

## 运行

### 直接运行

```bash
IMG_DIR=/path/to/images ./bin/gallery

# 或者自定义端口
IMG_DIR=/path/to/images PORT=9395 ./bin/gallery
```

### Docker compose

参考 `compose.yml`，修改相应的镜像名、端口、图片路径等，然后执行

```bash
docker compose up -d

# 如果 Docker 的版本比较旧，则执行
docker-compose up -d
```

然后用浏览器访问 http://127.0.0.1:9394/ （不是在本地运行的自行替换 IP 地址）就可以享用了😉