<template>
  <div class="alert alert-danger" v-if="error">{{ error }}</div>
  <form class="d-flex chat-form">
    <input
      type="text"
      class="form-control rouned-0"
      placeholder="Type your messages..."
      required
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    />
    <button class="btn btn-primary rounded-0" @click.prevent="handleSubmit">
        <i class="fas fa-paper-plane">
          
        </i>
    </button>
  </form>
</template>

<script>
import { ref } from 'vue'
import getUser from '../../composable/getUser'
import useCollection from '../../composable/useCollection'
import  { timestamp } from '../../config/firebase'

export default {
setup() {
  const message = ref('')
  const {error, storeDoc} = useCollection('message')
  const {user} = getUser()

  const handleSubmit = async () => {
    const chat = { 
      name: user.value.displayName,
      message: message.value,
      createdAt: timestamp(),
    }
    await storeDoc(chat)
    if(!error.value) {
      message.value = ''
    }
  }
  return {message, handleSubmit, error}
}
}
</script>

<style>

</style>