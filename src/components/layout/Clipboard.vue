<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @link https://github.com/andersevenrud/vuensee
 @license MIT
-->
<template>
  <div :class="$style.clipboard">
    <form @submit.prevent>
      <div>
        <Textarea
          :value="current"
          @change="$emit('update', $event.target.value)"
        />
      </div>
      <footer>
        <Button @click="$emit('clear')">
          {{ t('clipboard.clear') }}
        </Button>
      </footer>
    </form>
  </div>
</template>

<style module>
.clipboard {
  padding: var(--vuensee-margin-half);
  box-sizing: border-box;
}

.clipboard footer {
  margin-top: var(--vuensee-margin-half);
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
