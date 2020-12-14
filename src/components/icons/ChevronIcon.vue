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
export default {
  name: 'ChevronIcon',
  props: {
    dir: {
      type: String,
      default: 'right'
    }
  },
  computed: {
    points() {
      return this.dir === 'right'
        ? '9 18 15 12 9 6'
        : '15 18 9 12 15 6'
    }
  }
}
</script>
