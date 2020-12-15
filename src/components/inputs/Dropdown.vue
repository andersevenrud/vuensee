<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @link https://github.com/andersevenrud/vuensee
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
  padding: var(--vuensee-margin-half);
  border: var(--vuensee-input-border);
  background-color: var(--vuensee-input-background-color);
  display: block;
  width: 100%;
  transition: var(--vuensee-default-transition);
}
.dropdown select:focus {
  outline: var(--vuensee-input-outline);
}
.dropdown select:disabled {
  background-color: var(--vuensee-input-disabled-background-color);
}
.dropdown label > span {
  display: block;
  margin-bottom: var(--vuensee-margin-quarter);
}
</style>

<script>
export default {
  name: 'Dropdown',
  inheritAttrs: false,
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
