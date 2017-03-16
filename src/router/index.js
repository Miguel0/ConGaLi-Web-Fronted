import Vue from 'vue'
import VueWebsocket from 'vue-websocket'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ConwaysGamePlaceholder from '@/components/ConwaysGamePlaceholder'

Vue.use(Router)
Vue.use(VueWebsocket, 'ws://localhost:3000')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/game',
      name: 'Game',
      component: ConwaysGamePlaceholder
    }
  ]
})
