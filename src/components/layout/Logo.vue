<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.logo">
    {{ title }}
  </div>
</template>

<style module>
.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: var(--vuensee-logo-text-color);
  font-size: var(--vuensee-logo-font-size);
  text-shadow: var(--vuensee-logo-text-shadow);
  opacity: 0.8;
}
</style>

<script>
export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
