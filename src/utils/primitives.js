/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */

export const camelToSnake = str => str
  .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  .toUpperCase()

export const isBoolean = str => ['1', 'on', 'true'].includes(String(str).toLowerCase())

export const diffObject = (a, b) => Object.fromEntries(
  Object
    .entries(b)
    .filter(([k, v]) => (k in a && a[k] !== v))
)
