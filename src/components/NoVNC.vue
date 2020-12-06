<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div
    ref="view"
    :class="$style.vnc"
  />
</template>

<style module>
.vnc {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
}
</style>

<script>
import { ref, watch } from 'vue'
import { client } from '../novnc'

export default {
  name: 'NoVNC',

  props: {
    connected: {
      type: Boolean,
      required: true
    },
    connecting: {
      type: Boolean,
      required: true
    },
    disconnecting: {
      type: Boolean,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },

  emits: [
    'disconnected',
    'connected',
    'credentialsrequired',
    'securityfailure',
    'error',
    'desktopname',
    'bell',
    'capabilities',
    'clipboard'
  ],

  setup(props, { emit }) {
    const view = ref(null)

    const emitter = (name, e) => {
      if (import.meta.env.DEV) {
        console.debug(name, e)
      }

      emit(name, e)
    }

    watch(() => props.disconnecting, (disconnecting) => {
      if (disconnecting) {
        client.disconnect()
      }
    })

    watch(() => props.connecting, (connecting) => {
      if (connecting) {
        try {
          client.connect({
            root: view.value,
            options: props.options,
            emitter
          })
        } catch (e) {
          console.error(e)
          emitter('error', e.message)
        }
      }
    })

    watch(() => props.options, (options) => {
      if (props.connected) {
        client.applySettings(options)
      }
    }, { deep: true })

    return {
      view
    }
  }
}
</script>
