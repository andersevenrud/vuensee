# vuensee

> `/wuː'ɛn'siː/`

A [noVNC](https://github.com/novnc/noVNC) client interface built with Vue 3 and Vite.

Designed to match the features of the official client application but with an improved
interface, maintainability and customization support.

Check out the demo [here](https://andersevenrud.github.io/vuensee/index.html).

## Requirements

Runs on any modern browser.

Either Docker or Node 14+ is required for building and development.

VNC connection must support WebSockets. See the
[noVNC documentation](https://github.com/novnc/noVNC#server-requirements)
for more information.

## Usage

There are three ways to build and run this applocation:

* [Docker Image](#docker-image)
* [Docker Compose](#docker-compose)
* [Standard](#standard)

### Docker Image

Build and run your own production image:

```shell
docker build -t vuensee:custom .
docker run -p 8080:80 vuensee:custom
```

Or run a pre-built docker image (same as demo):

```shell
docker run -p 8080:80 docker.pkg.github.com/andersevenrud/vuensee/vuensee:latest
```

### Docker Compose

To start up the development environment:

```shell
docker-compose up
```

Or to create a production build:

```shell
docker-compose run --rm vuensee npm run build
```

### Standard

Install dependencies:

```shell
npm install
```

Start the development server:

```shell
npm run dev
```

Or to create a production build:

```shell
npm run build
```

## Configuration

Copy `.env.example` to `.env` and customize to your liking. Then build the solution.

> You have to restart the development environment after changing this file.

Some settings can be overrided with URL parameters on runtime, ex: `?a=1&b=2`.

| Environment variable            | URL parameter    | Type      | Default      |
| ------------------------------- | ---------------- | --------- | ------------ |
| `VITE_TITLE`                    |                  | String    | `vuensee`    |
| `VITE_ENABLE_SETTINGS`          |                  | Boolean   | `true`       |
| `VITE_ENABLE_CLIPBOARD`         |                  | Boolean   | `true`       |
| `VITE_ENABLE_FULLSCREEN`        |                  | Boolean   | `true`       |
| `VITE_ENABLE_POWER`             |                  | Boolean   | `true`       |
| `VITE_ENABLE_KEYS`              |                  | Boolean   | `true`       |
| `VITE_ENABLE_URL_SETTINGS`      |                  | Boolean   | `true`       |
| `VITE_SETTINGS_AUTOCONNECT`     | `autoconnect`    | Boolean   | `false`      |
| `VITE_SETTINGS_BELL`            | `bell`           | Boolean   | `true`       |
| `VITE_SETTINGS_SHARED_MODE`     | `sharedMode`     | Boolean   | `true`       |
| `VITE_SETTINGS_VIEW_ONLY`       | `viewOnly`       | Boolean   | `false`      |
| `VITE_SETTINGS_CLIP_TO_WINDOW`  | `clipToWindow`   | Boolean   | `false`      |
| `VITE_SETTINGS_SCALING_MODE`    | `scalingMode`    | String    | `off`        |
| `VITE_SETTINGS_QUALITY`         | `quality`        | Number    | `6`          |
| `VITE_SETTINGS_COMPRESSION`     | `compression`    | Number    | `2`          |
| `VITE_SETTINGS_RECONNECT`       | `reconnect`      | Boolean   | `false`      |
| `VITE_SETTINGS_RECONNECT_DELAY` | `reconnectDelay` | Number    | `5000`       |
| `VITE_SETTINGS_DOT_CURSOR`      | `dotCursor`      | Boolean   | `false`      |
| `VITE_SETTINGS_HOSTNAME`        | `hostname`       | String    | Auto         |
| `VITE_SETTINGS_PATH`            | `path`           | String    | `websockify` |
| `VITE_SETTINGS_REPEATER_ID`     | `repeaterId`     | String    |              |
| `VITE_SETTINGS_PORT`            | `port`           | Number    | Auto         |
| `VITE_SETTINGS_SSL`             | `ssl`            | Boolean   | Auto         |

## License

MIT

### Third party licenses

* [Feather Icons](https://raw.githubusercontent.com/feathericons/feather/master/LICENSE)
* [Bell sound](https://github.com/novnc/noVNC/blob/9142f8f0f7b4a53447f5cfec3a797cbf0d6204a9/app/sounds/CREDITS)
