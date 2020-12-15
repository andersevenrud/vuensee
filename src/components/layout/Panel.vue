<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @link https://github.com/andersevenrud/vuensee
 @license MIT
-->
<template>
  <div
    ref="panel"
    :class="panelClasses"
    @mouseout="onMouseOut"
  >
    <slot />
  </div>
</template>

<style module>
.panel {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  max-height: 100%;
  box-shadow: var(--vuensee-panel-shadow);
  background-color: var(--vuensee-panel-background-color);
  transition: var(--vuensee-default-transition);
}

.invisible {
  transform: translateX(-100%);
  margin-left: var(--vuensee-icon-size);
  animation: scrollDown 0.5s normal forwards;
}

@media screen and (max-width: 780px) {
  .visible {
    width: 100%;
  }
}

@media screen and (min-width: 780px) {
  .panel > div:nth-child(n+2) {
    min-width: 30em;
  }
}

@keyframes scrollDown {
  0% {
    top: 0%;
  }
  100% {
    top: calc(50% - var(--vuensee-margin-half));
  }
}
</style>

<script>
export default {
  name: 'Panel',

  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },

  emits: [
    'mouseout'
  ],

  computed: {
    panelClasses() {
      return {
        [this.$style.panel]: true,
        [this.$style.visible]: this.visible,
        [this.$style.invisible]: !this.visible
      }
    }
  },

  methods: {
    onMouseOut(e) {
      try {
        const el = e.toElement || e.relatedTarget

        if (this.$refs.panel.contains(el)) {
          return
        }

        this.$emit('mouseout')
      } catch (e) {
        console.debug('Missing some cross browser here', e)
      }
    }
  }
}
</script>
