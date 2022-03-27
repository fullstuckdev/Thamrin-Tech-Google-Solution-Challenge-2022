<template>
<div v-if="documents" ref="chat" class="chat-box">
    <div v-for="doc in formattedDocuments" :key="doc.id" class="chat-bubble">
    <div class="chat-head">
        <div>{{ doc.name }}</div>
        <div>{{doc.createdAt }}</div>
    </div>

    <div class="chat-body">
      {{ doc.message }}
    </div>
    </div>
</div>
</template>

<script>
import getCollection from '../../composable/getCollection'
import { computed, onUpdated, ref } from 'vue'
import { formatDistanceToNow } from 'date-fns'

export default {
setup() {
    const {error, documents} = getCollection('message')
    const chat = ref(null)
    const formattedDocuments = computed(()=> {
        if(documents.value) {
            return documents.value.map((doc) => {
                let time = formatDistanceToNow(doc.createdAt.toDate())
                return { ...doc, createdAt: time }
            })
        }
    })

    onUpdated (() => {
        
            chat.value.scrollTop = chat.value.scrollHeight
        
    })
    return {error, documents, chat, formattedDocuments}
}
}
</script>

<style>

</style>