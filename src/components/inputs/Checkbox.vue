<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.checkbox">
    <label :class="{ [$style.disabled]: $attrs.disabled }">
      <input
        v-bind="$attrs"
        type="checkbox"
      >

      <span :class="$style.overlay">
        <span v-if="$attrs.checked" />
      </span>

      <span :class="$style.label">
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
  margin-right: var(--vuensee-margin-half);
  border: var(--vuensee-input-border);
  background-color: var(--vuensee-input-background-color);
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

.checkbox .disabled {
  cursor: not-allowed;
}
.disabled .label,
.disabled .overlay > span {
  opacity: 0.5;
}
</style>

<script>
export default {
  name: 'Checkbox',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
