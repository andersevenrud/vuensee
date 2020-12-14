<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @link https://github.com/andersevenrud/vuensee
 @license MIT
-->
<template>
  <div :class="$style.kbd">
    <textarea
      ref="textarea"
      v-bind="$attrs"
      autocomplete="off"
      autocapitalize="off"
      spellcheck="false"
      tabindex="-1"
      @keydown="onKeyDown"
      @keyup="onKeyUp"
      @keypress="onKeyPress"
      @input="onInput"
      @submit.prevent="() => false"
    />
  </div>
</template>

<style module>
.kbd {
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { inputKeyListener } from '../../utils/dom'

export default {
  name: 'TouchKeyboard',

  emits: [
    'input',
    'hide'
  ],

  setup(_, { emit }) {
    const textarea = ref(null)
    const h = inputKeyListener(val => emit('input', val))

    const onKeepKeyboard = (ev) => {
      if (
        ev.target.name === 'touchKeyboardToggle' || // FIXME: This is not a nice way to do it
        document.activeElement !== textarea.value
      ) {
        return
      }

      const allow = ['TEXTAREA', 'INPUT', 'SELECT', 'BUTTON']
      if (!allow.includes(ev.target.tagName)) {
        ev.preventDefault()
      }

      emit('hide')
    }

    onMounted(() => textarea.value.focus())
    onMounted(() => document.addEventListener('mousedown', onKeepKeyboard, true))
    onUnmounted(() => document.removeEventListener('mousedown', onKeepKeyboard, true))

    return {
      onKeyDown: e => h.down(e),
      onKeyUp: e => h.up(e),
      onKeyPress: e => h.press(e),
      onInput: e => h.input(e),
      textarea
    }
  }
}
</script>
