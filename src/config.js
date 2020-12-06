/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */

import {
  camelToSnake,
  isBoolean
} from './utils'

const env = { ...import.meta.env }

const params = Object.fromEntries(
  new URLSearchParams(window.location.search.substring(1))
)

const fromFeatureEnv = k => env[`VITE_ENABLE_${k.toUpperCase()}`]
const fromSettingsEnv = k => env[`VITE_SETTINGS_${camelToSnake(k)}`]

const valueCheck = (v, defaultV, fn) => typeof v === 'string'
  ? fn(v)
  : defaultV

const featureCheck = v => valueCheck(v, true, isBoolean)

const parseBoolean = v =>
  valueCheck(v, undefined, () => isBoolean)

const parseNumber = v =>
  valueCheck(v, undefined, () => parseInt(v, 10))

const parseString = v =>
  valueCheck(v, undefined, () => v.trim())

const settingsMap = [
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

const defaultSettings = Object.fromEntries(
  settingsMap
    .map(([k, fn]) => [k, fn(fromSettingsEnv(k))])
    .filter(([, v]) => v !== undefined)
)

const features = Object.fromEntries(
  featureMap
    .map(k => [k, featureCheck(fromFeatureEnv(k))])
)

if (featureCheck(fromFeatureEnv('urlSettings'))) {
  const overrideSettings = Object.fromEntries(
    settingsMap
      .map(([k, fn]) => [k, fn(params[k])])
      .filter(([, v]) => v !== undefined)
  )

  Object.assign(defaultSettings, overrideSettings)
}

export default {
  title: import.meta.env.VITE_TITLE || 'vuensee',
  features,
  defaultSettings
}
