/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */

import { createI18n } from 'vue-i18n'
import en from './translations/en'
import no from './translations/no'
import config from '../config'

const i18n = createI18n({
  legacy: false,
  locale: config.settings.language || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    no
  }
})

export default i18n
