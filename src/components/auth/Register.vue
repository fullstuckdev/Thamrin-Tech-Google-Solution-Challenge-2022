<template>
  <form @submit.prevent="handleSubmit">
    <div class="alert alert-danger" v-if="error">
      {{ error }}
    </div>
    <h3 class="h3 mb-3 fw-normal">Register</h3>
    <div class="form-floating">
      <input type="text" class="form-control" v-model="name" />
      <label for="">Name</label>
    </div>
    <div class="form-floating">
      <input type="email" class="form-control" v-model="email" />
      <label for="">Email Address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" v-model="password" />
      <label for="">Password</label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">
      Register
    </button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useRegister from '../../composable/useRegister'
export default {
  setup(props, context) {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const { error, register } = useRegister()
    const handleSubmit = async () => {
      await register(name.value, email.value, password.value)
      if (!error.value) {
        context.emit('register')
      }
    }
    return { name, email, password, error, handleSubmit }
  },
}

</script>

<style></style>