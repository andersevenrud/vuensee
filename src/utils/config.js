/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */

import { camelToSnake, csvToArray, isTrue } from './primitives'

const env = { ...import.meta.env }

const params = Object.fromEntries(new URLSearchParams(
  window.location.search.substring(1)
))

/**
 * Any from ENV
 */
export const fromEnv = k => env[`VITE_${camelToSnake(k)}`]

/**
 * Feature from ENV
 */
export const fromFeatureEnv = k => env[`VITE_ENABLE_${camelToSnake(k)}`]

/**
 * Settings from ENV
 */
export const fromSettingsEnv = k => env[`VITE_SETTINGS_${camelToSnake(k)}`]

/**
 * Checks givel URL parameter for existence
 */
export const hasUrlParameter = k => params[k] !== undefined

/**
 * Call given parse function or return a default value
 */
export const parseOrDefault = (fn, defaultV = undefined) => v =>
  typeof v === 'string' ? fn(v) : defaultV

/**
 * Check if the feature is enabled
 */
export const featureCheck = parseOrDefault(isTrue, true)

/**
 * Returns a parsed or emapty array from comma separated string
 */
export const parseArray = parseOrDefault(csvToArray, [])

/**
 * Returns a parsed boolean if not undefined
 */
export const parseBoolean = parseOrDefault(isTrue)

/**
 * Returns a parsed number if not undefined
 */
export const parseNumber = parseOrDefault(v => parseInt(v, 10))

/**
 * Returns a parsed string if not undefined
 */
export const parseString = parseOrDefault(v => v.trim())

/**
 * Creates a new object without undefined values
 */
const readWrapper = cb => dict => Object.fromEntries(
  dict
    .map(cb)
    .filter(([, v]) => v !== undefined)
)

/**
 * Reads all settings with given map from ENV
 */
export const readSettings = readWrapper(
  ([k, fn]) => [k, fn(fromSettingsEnv(k))]
)

/**
 * Reads all settings with given map from URL
 */
export const readUrlSettings = readWrapper(
  ([k, fn]) => [k, fn(params[k])]
)

/**
 * Reads all features with given map from ENV
 */
export const readFeatures = readWrapper(
  k => [k, featureCheck(fromFeatureEnv(k))]
)

/**
 * Returns an array of languages supported by the browser
 * in a short form. Ex: en_EN -> en
 */
export const readNavigatorLanguages = languageMap =>
  (navigator.languages || [])
    .map(name => name.split(/-|_/)[0])
    .map(name => languageMap[name] || name)

/**
 * Wrapper for handling localStorage settings
 */
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
