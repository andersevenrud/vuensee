<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.textarea">
    <label>
      <span v-if="label">
        {{ label }}
      </span>
      <textarea v-bind="$attrs" />
    </label>
  </div>
</template>

<style module>
.textarea textarea {
  padding: var(--vuensee-margin-half);
  border: var(--vuensee-input-border);
  background-color: var(--vuensee-input-background-color);
  resize: none;
  display: block;
  width: 100%;
}
.textarea textarea input:disabled {
  background-color: var(--vuensee-input-disabled-background-color);
}
.textarea label > span {
  display: block;
  margin-bottom: var(--vuensee-margin-quarter);
}
</style>

<script>
export default {
  name: 'Textarea',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
