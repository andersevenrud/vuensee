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
      <textarea
        v-bind="$attrs"
      />
    </label>
  </div>
</template>

<style module>
.textarea textarea {
  padding: var(--app-margin-half);
  border: var(--app-input-border);
  background-color: var(--app-input-background-color);
  resize: none;
  display: block;
  width: 100%;
}
.textarea textarea input:disabled {
  background-color: var(--app-input-disabled-background-color);
}
.textarea label > span {
  display: block;
  margin-bottom: var(--app-margin-quarter);
}
</style>

<script>
export default {
  name: 'Textarea',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
