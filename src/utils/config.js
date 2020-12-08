/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */

import { camelToSnake, isBoolean } from './primitives'

const env = { ...import.meta.env }

export const params = Object.fromEntries(
  new URLSearchParams(window.location.search.substring(1))
)

export const fromFeatureEnv = k => env[`VITE_ENABLE_${k.toUpperCase()}`]
export const fromSettingsEnv = k => env[`VITE_SETTINGS_${camelToSnake(k)}`]

export const valueCheck = (v, defaultV, fn) => typeof v === 'string'
  ? fn(v)
  : defaultV

export const featureCheck = v => valueCheck(v, true, isBoolean)

export const parseBoolean = v =>
  valueCheck(v, undefined, () => isBoolean)

export const parseNumber = v =>
  valueCheck(v, undefined, () => parseInt(v, 10))

export const parseString = v =>
  valueCheck(v, undefined, () => v.trim())

export const readSettings = settingsMap =>
  Object.fromEntries(
    settingsMap
      .map(([k, fn]) => [k, fn(fromSettingsEnv(k))])
      .filter(([, v]) => v !== undefined)
  )

export const readFeatures = featureMap =>
  Object.fromEntries(
    featureMap
      .map(k => [k, featureCheck(fromFeatureEnv(k))])
  )

export const readUrlSettings = settingsMap =>
  Object.fromEntries(
    settingsMap
      .map(([k, fn]) => [k, fn(params[k])])
      .filter(([, v]) => v !== undefined)
  )
