/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */

export default {
  controls: {
    panel: 'Skjul/Vis',
    settings: 'Instillinger',
    keys: 'Send tastetrykk',
    clipboard: 'Utklippstavle',
    fullscreen: 'Fullskjerm',
    power: 'Strøkkontrol',
    connect: 'Koble til',
    disconnect: 'Koble fra',
    drag: 'Beveg visningsramme',
    touchKeyboard: 'Touch-enhet tastatur'
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
    clear: 'Tøm'
  },

  power: {
    shutdown: 'Slå av',
    reboot: 'Omstart',
    reset: 'Reset'
  },

  scalingModes: {
    off: 'Ingen',
    scale: 'Lokal skalering',
    remote: 'Fjern skalering'
  },

  settings: {
    session: {
      header: 'Sessjon',
      sharedMode: 'Delt Modus',
      viewOnly: 'Kun Visning',
      bell: 'Bjellelyd fra system',
      dotCursor: 'Vis dott hvis ingen peker',
      clipToWindow: 'Klipp til vindu'
    },
    visuals: {
      header: 'Visuelt',
      scalingMode: 'Skaleringsmodus',
      quality: 'Kvalitet',
      compression: 'Kompressjonsnivå'
    },
    connection: {
      header: 'Tilkobling',
      repeaterId: 'Repeater ID',
      hostname: 'Vertsnavn',
      port: 'Port',
      path: 'Sti',
      password: 'Passord',
      ssl: 'Sikker socket',
      reconnect: 'Automatisk gjenkobling',
      reconnectDelay: 'Gjenkoblings forsinkelse (ms)'
    }
  },

  login: {
    passwordPlaceholder: 'Tast inn kontopassord',
    submit: 'Send',
    cancel: 'Avbryt'
  },

  messages: {
    connected: 'Tilkoblet',
    connecting: 'Kobler til',
    disconnected: 'Koglet fra',
    reconnecting: 'Gjenkobler om {delay}ms...',
    connectionLost: 'Kobling ble brutt',
    connectionFailure: 'Kunne ikke opprette kobling',
    securityFailure: 'Sikkerhets håndtrykk feilet ({status}): {reason}',
    credentialsRequired: 'Autentisering påkrevd for tilkobling'
  }
}
