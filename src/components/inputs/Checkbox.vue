<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.checkbox">
    <label>
      <input
        v-bind="$attrs"
        type="checkbox"
      >

      <span :class="$style.overlay">
        <span v-if="$attrs.checked" />
      </span>

      <span>
        {{ label }}
      </span>
    </label>
  </div>
</template>

<style module>
.checkbox label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.checkbox input {
  display: none;
}

.overlay {
  width: 1rem;
  height: 1rem;
  margin-right: var(--app-margin-half);
  border: var(--app-input-border);
  background-color: var(--app-input-background-color);
  position: relative;
}

.overlay > span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.8rem;
  height: 0.8rem;
  background-color: currentColor;
  transform: translate(-50%, -50%);
}
</style>

<script>
export default {
  name: 'Checkbox',
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
