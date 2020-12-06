/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */

export default {
  en: {
    controls: {
      settings: 'Toggle settings',
      keys: 'Send keys',
      clipboard: 'Toggle clipboard',
      fullscreen: 'Toggle fullscreen',
      power: 'Toggle power buttons',
      connect: 'Connect',
      disconnect: 'Disconnect'
    },

    keys: {
      esc: 'Esc',
      ctrl: 'Ctrl',
      alt: 'Alt',
      windows: 'Windows',
      tab: 'Tab',
      cad: 'Ctrl+Alt+Del'
    },

    clipboard: {
      clear: 'Clear'
    },

    power: {
      shutdown: 'Shutdown',
      reboot: 'Reboot',
      reset: 'Reset'
    },

    settings: {
      session: {
        header: 'Session',
        sharedMode: 'Shared Mode',
        viewOnly: 'View Only',
        bell: 'System bell sound',
        dotCursor: 'Show dot when no cursor',
        clipToWindow: 'Clip to Window'
      },
      visuals: {
        header: 'Visuals',
        scalingMode: 'Scaling Mode',
        quality: 'Quality',
        compression: 'Compression level'
      },
      connection: {
        header: 'Connection',
        repeaterId: 'Repeater ID',
        hostname: 'Hostname',
        port: 'Port',
        path: 'Path',
        password: 'Passsword',
        ssl: 'Secure socket',
        reconnect: 'Automatic Reconnect',
        reconnectDelay: 'Reconnection Delay (ms)'
      }
    },

    login: {
      passwordPlaceholder: 'Enter account password',
      submit: 'Submit'
    },

    messages: {
      connecting: 'Connecting',
      disconnected: 'Disconnected',
      reconnecting: 'Reconnecting in {delay}ms...',
      connectionLost: 'Connection was lost',
      connectionFailure: 'Could not establish connection',
      securityFailure: 'Security handshake failure ({status}): {reason}'
    }
  }
}
