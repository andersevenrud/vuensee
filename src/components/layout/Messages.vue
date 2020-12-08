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
      :class="[$style.message, $style[message.type]]"
    >
      {{ message.message }}
    </div>
  </div>
</template>

<style module>
.messages {
  position: absolute;
  bottom: var(--app-margin);
  right: var(--app-margin);
  z-index: 1000;
  pointer-events: none;
  min-width: 5rem;
  text-align: center;
}

.message {
  padding: var(--app-margin);
  background-color: var(--app-background-color);
  box-shadow: var(--app-message-shadow);
  box-sizing: border-box;
  border-radius: var(--app-message-border-radius);
}

.message:not(:last-child) {
  margin-bottom: var(--app-margin);
}

.message.info {
  background-color: var(--app-message-info-background-color);
  color: var(--app-message-info-text-color);
}

.message.warn {
  background-color: var(--app-message-warn-background-color);
  color: var(--app-message-warn-text-color);
}

.message.error {
  background-color: var(--app-message-error-background-color);
  color: var(--app-message-error-text-color);
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
  }
}
</script>
