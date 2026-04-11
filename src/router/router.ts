import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Popular from '@/views/Popular.vue'
import DetailView from '@/views/DetailView.vue'
import PopularLocal from '@/views/PopularLocal.vue'
import Genres from '@/views/Genres.vue'
import GenresMovies from '@/views/GenresMovies.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

import { checkIfItsLogged } from '@/services/supabase'
import Collection from '@/views/Collection.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/popular', component: Popular },
    { path: '/movie/:id', component: DetailView },
    { path: '/popular/local', component: PopularLocal },
    { path: '/generos', component: Genres },
    { path: '/generos/:id', component: GenresMovies },
    {
      path: '/login',
      component: Login,
      beforeEnter: async () => {
        try {
          if (await checkIfItsLogged()) {
            return '/home'
          }
        } catch (e) {
          return true
        }
      },
    },
    {
      path: '/register',
      component: Register,
      beforeEnter: async () => {
        try {
          if (await checkIfItsLogged()) return '/home'
        } catch (e) {
          return true
        }
      },
    },
    { path: '/coleccion', component: Collection },
  ],
})

/*
// Navigation guard
router.beforeEach((to) => {
  const isLoggedIn = false
  if (to.meta.requiresAuth && !isLoggedIn) {
    return '/login'
  }
})*/

export default router
