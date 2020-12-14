<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @link https://github.com/andersevenrud/vuensee
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
        <Button type="submit">
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
  padding: var(--vuensee-margin);
  box-shadow: var(--vuensee-panel-shadow);
  background-color: var(--vuensee-panel-background-color);
  width: 20rem;
  max-width: 90%;
}

.button {
  text-align: right;
  margin-top: var(--vuensee-margin);
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
