<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline :points="points" />
  </svg>
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
