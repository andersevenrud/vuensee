<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <button
    type="button"
    v-bind="$attrs"
    :class="{ [$style.button]: true, [$style.active]: active }"
  >
    <slot />
  </button>
</template>

<style module>
.button {
  border: var(--vuensee-input-border);
  background-color: var(--vuensee-input-background-color);
  padding: var(--vuensee-margin-half);
}

.button * {
  pointer-events: none;
  vertical-align: middle;
}

.button svg {
  width: var(--vuensee-icon-size);
  height: var(--vuensee-icon-size),
}

.active {
  background: var(--vuensee-background-color) !important;
}
</style>

<script>
export default {
  name: 'Button',
  inheritAttrs: false,
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>
