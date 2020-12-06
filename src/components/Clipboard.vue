<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.clipboard">
    <form @submit.prevent>
      <div>
        <textarea
          :value="current"
          @change="$emit('update', $event.target.value)"
        />
      </div>
      <footer>
        <button
          type="button"
          @click="$emit('clear')"
        >
          {{ t('clipboard.clear') }}
        </button>
      </footer>
    </form>
  </div>
</template>

<style module>
.clipboard {
  padding: var(--app-margin-half);
}

.clipboard textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  resize: none;
}

.clipboard footer {
  margin-top: var(--app-margin-half);
  text-align: right;
}
</style>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'Clipboard',

  props: {
    current: {
      type: String,
      required: true
    }
  },

  emits: [
    'clear',
    'update'
  ],

  setup() {
    const { t } = useI18n()
    return { t }
  }
}
</script>
