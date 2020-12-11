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
.range label span {
  display: block;
  margin-bottom: var(--vuensee-margin-quarter);
}

/* NOTE: It's not possible to use multiple pseudo definitions with comma
 separation :( So for now this is this way */

/* RESET */
.range input {
  background: transparent;
  display: block;
  width: 100%;
  height: 2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.range input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

.range input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}

/* SLIDER */
.range input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  margin-top: 3px;
  width: calc(2rem - 10px);
  height: calc(2rem - 10px);
  background-color: currentColor;
  cursor: pointer;
}

.range input[type=range]::-moz-range-thumb {
  -moz-appearance: none;
  margin-top: 3px;
  width: calc(2rem - 10px);
  height: calc(2rem - 10px);
  background-color: currentColor;
  cursor: pointer;
}

.range input[type=range]::-ms-thumb {
  -webkit-appearance: none;
  margin-top: 3px;
  width: calc(2rem - 10px);
  height: calc(2rem - 10px);
  background-color: currentColor;
  cursor: pointer;
}

/* TRACK */
.range input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2rem;
  border: var(--vuensee-input-border);
  background-color: var(--vuensee-input-background-color);
  cursor: pointer;
}

.range input[type=range]::-moz-range-track {
  width: 100%;
  height: 1rem;
  border: var(--vuensee-input-border);
  background-color: var(--vuensee-input-background-color);
  cursor: pointer;
}

.range input[type=range]::-ms-track {
  width: 100%;
  height: 1rem;
  border: var(--vuensee-input-border);
  background-color: var(--vuensee-input-background-color);
  cursor: pointer;
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
