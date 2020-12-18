<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @link https://github.com/andersevenrud/vuensee
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

<style module lang="scss">
@mixin slider {
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 1rem;
  height: 2rem;
  background-color: currentColor;
  cursor: pointer;
  border-radius: 0;
  transition: var(--vuensee-default-transition);
}

@mixin track {
  width: 100%;
  height: 1rem;
  border: var(--vuensee-input-border);
  background-color: var(--vuensee-input-background-color);
  cursor: pointer;
}

.range label span {
  display: block;
  margin-bottom: var(--vuensee-margin-quarter);
}

.range input {
  /* Reset */
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  display: block;
  width: 100%;
  height: 2.375rem;
}
.range input:focus {
  outline: var(--vuensee-input-outline);
}

.range input[type=range]::-webkit-slider-thumb {
  @include slider();

  margin-top: -0.65rem;
}
.range input[type=range]::-moz-range-thumb {
  @include slider();
}
.range input[type=range]::-ms-thumb {
  @include slider();
}

.range input[type=range]::-webkit-slider-runnable-track {
  @include track();
}
.range input[type=range]::-moz-range-track {
  @include track();
}
.range input[type=range]::-ms-track {
  @include track();

  background: transparent;
  border-color: transparent;
  color: transparent;
}
</style>

<script>
export default {
  name: 'Range',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
