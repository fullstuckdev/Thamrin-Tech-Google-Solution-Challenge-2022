import { ref } from 'vue'
import { projectFirestore } from '../config/firebase'

const getCollection = (collection) => {
    const error = ref(null)
    const documents = ref(null)

    let collectionRef = projectFirestore
        .collection(collection)
        .orderBy('createdAt')

    collectionRef.onSnapshot(
        (snap) => {
            let results = []
            snap.docs.forEach((doc) => {
                doc.data().createdAt && results.push({...doc.data(), id: doc.id })
            })
            documents.value = results
            error.value = null
        },
        (err) => {
            console.error(err.message)
            documents.value = null
            error.value = 'could not fect data'
        }
    )

    return { error, documents }
}

export default getCollection