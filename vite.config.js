const config = {
  base: '',
  terserOptions: {
    format: {
      comments: /^!/
    }
  },
  optimizeDeps: {
    include: [
      '@novnc/novnc/core/input/keysym',
      '@novnc/novnc/core/input/keysymdef',
      '@novnc/novnc/core/util/browser'
    ]
  }
}

if (process.env.DOCKER_DEV_PORT) {
  const port = parseInt(process.env.DOCKER_DEV_PORT, 10)

  Object.assign(config, {
    port,
    hmr: {
      port: port
    }
  })
}

export default config
