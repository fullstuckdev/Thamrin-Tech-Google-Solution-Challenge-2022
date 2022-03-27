import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Room from '../views/Room.vue'
import { projectAuth } from '../config/firebase'

const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    if (!user) {
        next({ name: 'Home' })
    } else {
        next()
    }
}

const forbidAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    if (user) {
        next({ name: 'Room' })
    } else {
        next()
    }
}

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: forbidAuth,
    },
    {
        path: '/room',
        name: 'Room',
        component: Room,
        beforeEnter: requireAuth,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router