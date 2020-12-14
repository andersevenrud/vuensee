/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */

import { camelToSnake, isBoolean } from './primitives'

const env = { ...import.meta.env }

const params = Object.fromEntries(
  new URLSearchParams(window.location.search.substring(1))
)

export const fromFeatureEnv = k => env[`VITE_ENABLE_${k.toUpperCase()}`]
export const fromSettingsEnv = k => env[`VITE_SETTINGS_${camelToSnake(k)}`]

export const hasUrlParameter = k => params[k] !== undefined

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

export const localStorageSettings = (() => {
  const context = 'vuensee-settings'
  const enabled = window.localStorage !== undefined &&
    featureCheck(fromFeatureEnv('urlSettings'))

  let debouncer
  let current = {}

  const load = () => {
    const contents = enabled
      ? localStorage.getItem(context)
      : undefined

    if (contents) {
      try {
        current = JSON.parse(contents)
      } catch (e) {
        console.warn('Failed to load localStorage contents', e)
      }
    }

    return current
  }

  const clear = () => {
    if (enabled) {
      localStorage.removeItem(context)
      current = {}
    }
    return current
  }

  const save = () => {
    if (enabled) {
      clearTimeout(debouncer)
      debouncer = setTimeout(() => {
        localStorage.setItem(context, JSON.stringify(current))
      }, 250)
    }
  }

  const assign = (o, s = true) => {
    Object.assign(current, o)
    if (s) {
      save()
    }
  }

  return {
    assign,
    save,
    load,
    clear
  }
})()
