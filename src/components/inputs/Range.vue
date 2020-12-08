<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.range">
    <label>
      <span>
        {{ label }}
      </span>
      <input
        v-bind="$attrs"
        type="range"
      >
    </label>
  </div>
</template>

<style module>
.range input {
  display: block;
  width: 100%;
}
</style>

<script>
export default {
  name: 'Range',
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
