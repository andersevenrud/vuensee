<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.login">
    <form @submit.prevent="onSubmit">
      <div :class="$style.password">
        <input
          ref="input"
          v-model="password"
          type="password"
          :placeholder="t('login.passwordPlaceholder')"
        >
      </div>
      <div :class="$style.button">
        <button
          type="submit"
        >
          {{ t('login.submit') }}
        </button>
      </div>
    </form>
  </div>
</template>

<style module>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  padding: var(--app-margin);
  box-shadow: var(--app-panel-shadow);
  background-color: var(--app-panel-background-color);
}

.button {
  text-align: right;
  margin-top: var(--app-margin);
}

.button button {
  padding: var(--app-margin-half);
}
</style>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'Login',

  props: {
  },

  emits: [
    'submit'
  ],

  setup() {
    const { t } = useI18n()
    return { t }
  },

  data() {
    return {
      password: ''
    }
  },

  mounted() {
    this.$refs.input.focus()
  },

  methods: {
    onSubmit() {
      this.$emit('submit', {
        password: this.password
      })
    }
  }
}
</script>
