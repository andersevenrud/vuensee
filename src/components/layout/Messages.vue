<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.messages">
    <div
      v-for="message in messages"
      :key="message.key"
      :class="$style.message"
      :style="styles(message.type)"
      @click="$emit('click', $event, message)"
    >
      {{ message.message }}
    </div>
  </div>
</template>

<style module>
.messages {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1000;
  min-width: 5rem;
}

.message {
  padding: var(--app-margin);
  margin: var(--app-margin);
  background-color: var(--app-background-color);
  box-shadow: var(--app-message-shadow);
  border-radius: var(--app-message-border-radius);
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
}
</style>

<script>
export default {
  name: 'Messages',

  props: {
    messages: {
      type: Array,
      required: true
    }
  },

  emits: [
    'click'
  ],

  methods: {
    styles(type) {
      return {
        backgroundColor: `var(--app-message-${type}-background-color)`,
        color: `var(--app-message-${type}-text-color)`
      }
    }
  }
}
</script>
