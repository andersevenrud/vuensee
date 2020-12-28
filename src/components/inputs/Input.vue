<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @link https://github.com/andersevenrud/vuensee
 @license MIT
-->
<template>
  <div :class="$style.input">
    <label>
      <span
        v-if="label"
        @contextmenu.prevent
      >
        {{ label }}
      </span>
      <input
        ref="input"
        autocomplete="off"
        v-bind="$attrs"
        :type="$attrs.type || 'text'"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </label>
  </div>
</template>

<style module>
.input input {
  padding: var(--vuensee-margin-half);
  border: var(--vuensee-input-border);
  background-color: var(--vuensee-input-background-color);
  display: block;
  width: 100%;
  transition: var(--vuensee-default-transition);
}
.input input:focus {
  outline: var(--vuensee-input-outline);
}
.input input:disabled {
  background-color: var(--vuensee-input-disabled-background-color);
}
.input label > span {
  display: block;
  margin-bottom: var(--vuensee-margin-quarter);
}
</style>

<script>
export default {
  name: 'Input',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update:modelValue'
  ],
  mounted() {
    if (this.autofocus) {
      this.$refs.input.focus()
    }
  }
}
</script>
