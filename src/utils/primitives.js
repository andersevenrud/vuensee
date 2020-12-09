/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */

export const camelToSnake = str => str
  .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  .toUpperCase()

export const isBoolean = str => ['1', 'on', 'true'].includes(String(str).toLowerCase())
