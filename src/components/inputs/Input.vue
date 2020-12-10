<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.input">
    <label>
      <span v-if="label">
        {{ label }}
      </span>
      <input
        ref="input"
        v-bind="$attrs"
        :type="$attrs.type || 'text'"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </label>
  </div>
</template>

<style module>
.input input {
  padding: var(--app-margin-half);
  border: var(--app-input-border);
  background-color: var(--app-input-background-color);
  display: block;
  width: 100%;
}
.input input:disabled {
  background-color: var(--app-input-disabled-background-color);
}
.input label > span {
  display: block;
  margin-bottom: var(--app-margin-quarter);
}
</style>

<script>
export default {
  name: 'Input',
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
  },
}
</script>
