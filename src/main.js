/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './components/App.vue'
import messages from './translations'
import './index.css'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
