/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './components/App.vue'
import Input from './components/inputs/Input.vue'
import Textarea from './components/inputs/Textarea.vue'
import Dropdown from './components/inputs/Dropdown.vue'
import Range from './components/inputs/Range.vue'
import Button from './components/inputs/Button.vue'
import Checkbox from './components/inputs/Checkbox.vue'
import messages from './translations'
import './assets/index.css'
import './assets/theme.css'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

const app = createApp(App)
app.use(i18n)
app.component('Input', Input)
app.component('Textarea', Textarea)
app.component('Dropdown', Dropdown)
app.component('Range', Range)
app.component('Button', Button)
app.component('Checkbox', Checkbox)
app.mount('#app')
