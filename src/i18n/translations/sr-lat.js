/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */

export default {
  controls: {
    panel: 'Promena vidljivosti',
    settings: 'Promena podešavanja',
    keys: 'Pošalji ključeve',
    clipboard: 'Promena klipborda',
    fullscreen: 'Promena celog ekrana',
    power: 'Promena kontrole uključivanja',
    connect: 'Konektuj se',
    disconnect: 'Diskonektuj se',
    drag: 'Prevlačenje prozora',
    touchKeyboard: 'Tastatura na dodir'
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
    clear: 'Očisti'
  },

  power: {
    shutdown: 'Ugasi',
    reboot: 'Rebutuj',
    reset: 'Resetuj'
  },

  scalingModes: {
    off: 'Bez',
    scale: 'Lokalno skaliranje',
    remote: 'Daljinsko skaliranje'
  },

  settings: {
    session: {
      header: 'Sesija',
      sharedMode: 'Deljeni Mod',
      viewOnly: 'Samo pregled',
      bell: 'Sistemsko zvono',
      reconnect: 'Automatska rekonekcija',
      reconnectDelay: 'Rekonekcija posle (ms)'
    },
    visuals: {
      header: 'Prikaz',
      clipToWindow: 'Iseci do prozora',
      scalingMode: 'Mod skaliranja',
      dotCursor: 'Prikaži tačku kad nema kursora'
    },
    connection: {
      header: 'Konekcija',
      repeaterId: 'Ripiter ID',
      hostname: 'Ime hosta',
      port: 'Port',
      path: 'Putanja',
      password: 'Lozinka',
      ssl: 'Bezbednosni soket (SSL)'
    },
    stream: {
      header: 'Protok',
      quality: 'Kvalitet',
      compression: 'Nivo kompresije'
    }
  },

  login: {
    passwordPlaceholder: 'Unesite lozinku',
    submit: 'Pošalji',
    cancel: 'Odustani'
  },

  messages: {
    connected: 'Konektovan',
    connecting: 'Konektovanje',
    disconnected: 'Diskonektovanje',
    reconnecting: 'Rekonektovanje za {delay}ms...',
    connectionLost: 'Konekcija izgubljena',
    connectionFailure: 'Nemoguće uspostaviti konekciju',
    securityFailure: 'Greška prilikom uspostavljanja sigurne veze ({status}): {reason}',
    credentialsRequired: 'Potrebna autentifikacija'
  }
}
