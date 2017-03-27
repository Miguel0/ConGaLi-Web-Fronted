import Vue from 'vue'
import VueWebsocket from 'vue-websocket'
import Router from 'vue-router'
import LandingInnerPage from '@/components/LandingInnerPage'
import AvailableGamesPage from '@/components/AvailableGamesPage'
import ConwaysGamePlaceholder from '@/components/ConwaysGamePlaceholder'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(Router)
Vue.use(VueWebsocket, 'ws://localhost:3000')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingInnerPage
    },
    {
      path: '/game/:gameId',
      name: 'Game',
      component: ConwaysGamePlaceholder
    },
    {
      path: '/game',
      name: 'Available Games',
      component: AvailableGamesPage
    }
  ]
})
