<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.dropdown">
    <label>
      <span v-if="label">
        {{ label }}
      </span>
      <select
        v-bind="$attrs"
      >
        <option
          v-for="([k, v]) in options"
          :key="k"
          :selected="k === value"
          :value="k"
        >
          {{ v }}
        </option>
      </select>
    </label>
  </div>
</template>

<style module>
.dropdown select {
  padding: var(--app-margin-half);
  border: var(--app-input-border);
  background-color: var(--app-input-background-color);
  display: block;
  width: 100%;
}
.dropdown select:disabled {
  background-color: var(--app-input-disabled-background-color);
}
.dropdown label > span {
  display: block;
  margin-bottom: var(--app-margin-quarter);
}
</style>

<script>
export default {
  name: 'Dropdown',
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number],
      required: false,
      default: null
    }
  }
}
</script>
