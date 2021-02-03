import vue from '@vitejs/plugin-vue'

const config = {
  base: '',
  plugins: [
    vue()
  ],
  build: {
    terserOptions: {
      format: {
        comments: /^!/
      }
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
