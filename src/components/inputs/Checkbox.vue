<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @link https://github.com/andersevenrud/vuensee
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
        <CheckIcon v-if="$attrs.checked" />
      </span>

      <span :class="$style.label">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<style module>
.checkbox {
  overflow: hidden;
  position: relative;
}

.checkbox label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.checkbox input {
  position: absolute;
  width: 0;
  height: 0;
  z-index: 1;
  -webkit-appearance: none;
  -moz-appearance: none;

  /* NOTE: Moving this negative in any direction causes window scroll on activation */
  top: 0;
  left: 0;
}

.checkbox input:focus + span {
  outline: var(--vuensee-input-outline);
}

.overlay {
  margin: 1px;
  width: 1rem;
  height: 1rem;
  margin-right: var(--vuensee-margin-half);
  border: var(--vuensee-input-border);
  background-color: var(--vuensee-input-background-color);
  position: relative;
  transition: var(--vuensee-default-transition);
  z-index: 2;
}

.overlay > svg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.8rem;
  height: 0.8rem;
  transform: translate(-50%, -50%);
}

.checkbox .disabled {
  cursor: not-allowed;
}
.disabled .label,
.disabled .overlay > svg {
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
