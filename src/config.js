/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */

import {
  readFeatures,
  readSettings,
  readUrlSettings,
  parseBoolean,
  parseNumber,
  parseString,
  featureCheck,
  fromFeatureEnv,
  localStorageSettings,
  hasUrlParameter
} from './utils/config'

const settingsMap = [
  ['language', parseString],
  ['messageTimeout', parseNumber],
  ['autoconnect', parseBoolean],
  ['bell', parseBoolean],
  ['sharedMode', parseBoolean],
  ['viewOnly', parseBoolean],
  ['clipToWindow', parseBoolean],
  ['scalingMode', parseString],
  ['quality', parseNumber],
  ['compression', parseNumber],
  ['reconnect', parseBoolean],
  ['reconnectDelay', parseNumber],
  ['dotCursor', parseBoolean],
  ['hostname', parseString],
  ['path', parseString],
  ['repeaterId', parseString],
  ['port', parseNumber],
  ['ssl', parseBoolean]
]

const featureMap = [
  'localstorageSettings',
  'urlSettings',
  'viewportDragging',
  'touchKeyboard',
  'settings',
  'clipboard',
  'fullscreen',
  'power',
  'keys',
  'panel'
]

const languageMap = {
  nb: 'no'
}

const features = readFeatures(featureMap)

const dotenvSettings = readSettings(settingsMap)

const localSettings = hasUrlParameter('_clear')
  ? localStorageSettings.clear()
  : localStorageSettings.load()

const urlSettings = featureCheck(fromFeatureEnv('urlSettings'))
  ? readUrlSettings(settingsMap)
  : {}

const languages = (navigator.languages || [])
  .map(name => name.split(/-|_/)[0])
  .map(name => languageMap[name] || name)

export default {
  title: import.meta.env.VITE_TITLE || 'vuensee',
  bell: 'sounds/bell',
  features,
  localStorageBlacklist: [
    'password'
  ],
  settings: {
    language: languages[0],
    ...dotenvSettings,
    ...localSettings,
    ...urlSettings
  }
}
