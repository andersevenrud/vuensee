/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */

import { camelToSnake, isBoolean } from './primitives'

const env = { ...import.meta.env }

const params = Object.fromEntries(
  new URLSearchParams(window.location.search.substring(1))
)

/**
 * Feature from ENV
 */
export const fromFeatureEnv = k => env[`VITE_ENABLE_${k.toUpperCase()}`]

/**
 * Settings from ENV
 */
export const fromSettingsEnv = k => env[`VITE_SETTINGS_${camelToSnake(k)}`]

/**
 * Checks givel URL parameter for existence
 */
export const hasUrlParameter = k => params[k] !== undefined

/**
 * Call given function or return a default value
 */
export const valueCheck = (v, defaultV, fn) => typeof v === 'string'
  ? fn(v)
  : defaultV

/**
 * Check if the feature is enabled
 */
export const featureCheck = v => valueCheck(v, true, isBoolean)

/**
 * Prases a boolean if the value is the correct type
 */
export const parseBoolean = v =>
  valueCheck(v, undefined, () => isBoolean)

/**
 * Parses a number if the value is the correct type
 */
export const parseNumber = v =>
  valueCheck(v, undefined, () => parseInt(v, 10))

/**
 * Parses a string if value is the correct type
 */
export const parseString = v =>
  valueCheck(v, undefined, () => v.trim())

/**
 * Reads all settings with given map from ENV
 */
export const readSettings = settingsMap =>
  Object.fromEntries(
    settingsMap
      .map(([k, fn]) => [k, fn(fromSettingsEnv(k))])
      .filter(([, v]) => v !== undefined)
  )

/**
 * Reads all features with given map from ENV
 */
export const readFeatures = featureMap =>
  Object.fromEntries(
    featureMap
      .map(k => [k, featureCheck(fromFeatureEnv(k))])
  )

/**
 * Reads all settings with given map from URL
 */
export const readUrlSettings = settingsMap =>
  Object.fromEntries(
    settingsMap
      .map(([k, fn]) => [k, fn(params[k])])
      .filter(([, v]) => v !== undefined)
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
