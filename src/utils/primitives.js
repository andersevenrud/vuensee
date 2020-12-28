/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */

/**
 * Converts camel case to snake upper case
 * Ex: fooBar -> FOO_BAR
 */
export const camelToSnake = str => str
  .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  .toUpperCase()

/**
 * Checks if value of any type is true(-ish)
 */
export const isTrue = str => ['1', 'on', 'true', 'yes']
  .includes(String(str).toLowerCase())

/**
 * Comma separated string to array
 */
export const csvToArray = str => str
  .split(',')
  .map(s => s.trim())

/**
 * Returns the different entries from two objects
 */
export const diffObject = (a, b) => Object.fromEntries(
  Object
    .entries(b)
    .filter(([k, v]) => (k in a && a[k] !== v))
)
