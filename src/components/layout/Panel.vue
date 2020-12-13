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
  box-shadow: var(--vuensee-panel-shadow);
  background-color: var(--vuensee-panel-background-color);
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
}

.panelInvisible {
  width: auto;
  transform: translateX(-100%) translateY(-50%);
  margin-left: 24px; /* This is the icon size */
  top: 50%;
}

.panelInvisible:hover {
  opacity: 1;
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
