const config = {
  base: '',
  terserOptions: {
    format: {
      comments: /^!/
    }
  }
}

if (process.env.DOCKER_DEV_PORT) {
  const port = parseInt(process.env.DOCKER_DEV_PORT, 10)

  Object.assign(config, {
    port,
    hmr: {
      port: port
    },
  })
}

export default config
