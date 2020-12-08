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

      <span>
        {{ label }}
      </span>
    </label>
  </div>
</template>

<style module>
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
