# vuensee

> `/wuː'ɛn'siː/`

A [noVNC](https://github.com/novnc/noVNC) client interface built with Vue 3 and Vite.

Designed to match the features of the official client application but with an improved
interface, maintainability and customization support.

Check out the demo [here](https://andersevenrud.github.io/vuensee/index.html).

## Requirements

Runs on any modern browser.

Either Docker or Node 14+ is required for building and development.

## Usage

There are three ways to build and run this applocation:

* [Docker Image](#docker-image)
* [Docker Compose](#docker-compose)
* [Standard](#standard)

### Docker Image

To run a pre-built production build using docker:

```shell
docker run -p 8080:80 docker.pkg.github.com/andersevenrud/vuensee/vuensee:latest
```

Or to build your own production image:

```shell
docker build -t vuensee:custom .
docker run -p 8080:80 vuensee:custom
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

With the URL settings feature enabled (default) you can also pass settings using
URL query parameters:

`?settingsName=value&someOtherSetting=123`

## Connection

To set up a connection you'll need the following on the remote machine:

> You can read all about the requirements and setup in the noVNC `README` file.

1. A VNC Server
2. Websockify to communicate between the browser and VNC server
3. Port forwarding of websockify port (if you plan connecting via the internet)

## License

MIT

### Third party licenses

* [Feather Icons](https://raw.githubusercontent.com/feathericons/feather/master/LICENSE)
* [Bell sound](https://github.com/novnc/noVNC/blob/9142f8f0f7b4a53447f5cfec3a797cbf0d6204a9/app/sounds/CREDITS)
