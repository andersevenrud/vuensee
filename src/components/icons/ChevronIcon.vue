<!--
 feathericons
 @link https://github.com/feathericons/feather
 @license MIT
-->
<template>
  <Icon>
    <polyline :points="points" />
  </Icon>
</template>

<script>
import { computed } from 'vue'

const pointsMap = {
  down: '6 9 12 15 18 9',
  up: '18 15 12 9 6 15',
  right: '9 18 15 12 9 6',
  left: '15 18 9 12 15 6'
}

export default {
  name: 'ChevronIcon',
  props: {
    dir: {
      type: String,
      default: 'right'
    }
  },
  setup(props) {
    const points = computed(() => pointsMap[props.dir])
    return { points }
  }
}
</script>
