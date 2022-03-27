<template>
    <Navbar/>
  <main class="content mt-2 shadow-sm p-0">
  <div class="bg-primary text-white">
    <h3 class="p-3">
      Chat Group
    </h3>
  </div>
  <div class="chat-wrapper">
    <Chatbox/>
      <ChatForm/>
  </div>
  </main>
<Map/>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Chatbox from '../components/chat/Chatbox.vue'
import ChatForm from '../components/chat/Form.vue'
import Map from '../components/MapThamrin.vue'

export default {
  name: "App",
    components: {
    Navbar,
    Chatbox,
    ChatForm,
    Map
  },
};
</script>