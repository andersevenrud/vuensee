/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
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
  fromFeatureEnv
} from './utils/config'

const settingsMap = [
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
  'settings',
  'clipboard',
  'fullscreen',
  'power',
  'keys'
]

const features = readFeatures(featureMap)
const defaultSettings = readSettings(settingsMap)
const overrideSettings = featureCheck(fromFeatureEnv('urlSettings'))
  ? readUrlSettings(settingsMap)
  : {}

export default {
  title: import.meta.env.VITE_TITLE || 'vuensee',
  features,
  defaultSettings: {
    ...defaultSettings,
    ...overrideSettings
  }
}
