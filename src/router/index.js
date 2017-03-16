import Vue from 'vue'
import VueWebsocket from 'vue-websocket'
import Router from 'vue-router'
import LandingInnerPage from '@/components/LandingInnerPage'
import ConwaysGamePlaceholder from '@/components/ConwaysGamePlaceholder'

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
    }
  ]
})
