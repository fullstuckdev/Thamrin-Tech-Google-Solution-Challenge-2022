import { ref } from 'vue'
import { projectAuth } from '../config/firebase'

const error = ref(null)

const logout = async() => {
    error.value = null
    try {
        await projectAuth.signOut()
    } catch (err) {
        console.error(err.message)
        error.value = err.message
    }
}

const useLogout = () => {
    return { error, logout }
}

export default useLogout