import Vue from 'vue'
import VueWebsocket from 'vue-websocket'
import Router from 'vue-router'
import LandingInnerPage from '@/components/LandingInnerPage'
import AvailableGamesPage from '@/components/AvailableGamesPage'
import UsersProfiles from '@/components/UsersProfiles'
import UserProfile from '@/components/UserProfile'
import ConwaysGamePlaceholder from '@/components/ConwaysGamePlaceholder'
import ConwaysGameStorage from '@/plugins/cgStorage'
import Vuelidate from 'vuelidate'
import Toast from 'vue-easy-toast'

Vue.use(Toast)
Vue.use(Vuelidate)
Vue.use(ConwaysGameStorage)
Vue.use(Router)
Vue.use(VueWebsocket, 'ws://localhost:3000')

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingInnerPage
    },
    {
      path: '/logIn',
      name: 'logIn',
      props: { showSessionModal: true },
      component: LandingInnerPage
    },
    {
      path: '/signUp',
      name: 'signUp',
      props: { showSessionModal: true },
      component: LandingInnerPage
    },
    {
      path: '/user',
      name: 'User Profiles',
      meta: { requiresAuth: true },
      component: UsersProfiles
    },
    {
      path: '/user/:userId',
      name: 'User Profile',
      meta: { requiresAuth: true },
      component: UserProfile
    },
    {
      path: '/user/:userId/game/:gameId',
      name: 'Game',
      meta: { requiresAuth: true },
      component: ConwaysGamePlaceholder
    },
    {
      path: '/game',
      name: 'Available Games',
      meta: { requiresAuth: true },
      component: AvailableGamesPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Vue.cgStorage.isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
