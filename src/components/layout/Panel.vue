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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: var(--vuensee-panel-shadow);
  background-color: var(--vuensee-panel-background-color);
  display: flex;
  flex-direction: column;
  transition: all 0.5s;
}

@media screen and (max-width: 780px) {
  .panel {
    width: 100%;
  }
}

.panelVisible {
  max-height: 100vh;
}

.panelInvisible {
  width: auto;
  transform: translateX(-100%);
  margin-left: var(--vuensee-icon-size);
  animation: scrollDown 0.5s normal forwards;
}

.panelInvisible:hover {
  opacity: 1;
}

@keyframes scrollDown {
  0% {
    top: 0%;
  }
  100% {
    top: 50%;
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
        [this.$style.panelVisible]: this.visible,
        [this.$style.panelInvisible]: !this.visible
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
