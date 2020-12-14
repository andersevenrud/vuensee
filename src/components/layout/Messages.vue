<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @link https://github.com/andersevenrud/vuensee
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
  padding: var(--vuensee-margin);
  margin: var(--vuensee-margin);
  background-color: var(--vuensee-background-color);
  box-shadow: var(--vuensee-message-shadow);
  border-radius: var(--vuensee-message-border-radius);
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
        backgroundColor: `var(--vuensee-message-${type}-background-color)`,
        color: `var(--vuensee-message-${type}-text-color)`
      }
    }
  }
}
</script>
