<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.login">
    <form @submit.prevent="onSubmit">
      <Input
        v-model="password"
        type="password"
        :autofocus="true"
        :placeholder="t('login.passwordPlaceholder')"
      />

      <div :class="$style.button">
        <Button
          type="submit"
        >
          {{ t('login.submit') }}
        </Button>
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'Login',

  emits: [
    'submit'
  ],

  setup(_, { emit }) {
    const password = ref('')
    const { t } = useI18n()

    return {
      t,
      password,
      onSubmit: () => emit('submit', {
        password: password.value
      })
    }
  }
}
</script>
