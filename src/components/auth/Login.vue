<template>
  <form @submit.prevent="handleSubmit">
    <div class="alert alert-danger" v-if="error">
      {{ error }}
    </div>
    <h3 class="h3 mb-3 fw-normal">Login</h3>
    <div class="form-floating">
      <input type="email" class="form-control" v-model="email" />
      <label for="">Email Address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" v-model="password" />
      <label for="">Password</label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">
      Login
    </button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../../composable/useLogin'
export default {
  setup(props, context) {
    const email = ref('')
    const password = ref('')
    const { error, login } = useLogin()
    const handleSubmit = async () => {
      await login(email.value, password.value)
      if (!error.value) {
        context.emit('login')
      }
    }
    return { email, password, error, handleSubmit }
  },
}
</script>

<style></style>