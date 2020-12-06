<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
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
  position: absolute;
  z-index: 100;
  box-shadow: var(--app-panel-shadow);
  background-color: var(--app-panel-background-color);
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 780px) {
  .panel {
    min-width: auto !important;
    width: 100%;
  }
}

.panelVisible {
  max-height: 100%;
  min-width: 30rem;
}

.panelInvisible {
  opacity: 0.5;
  width: auto;
  transform: translateY(-90%);
}

.panelInvisible:hover {
  opacity: 1;
  transform: translateY(0%);
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
