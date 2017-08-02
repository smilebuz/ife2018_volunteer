import Vue from 'vue'
import Router from 'vue-router'
import OneThing from '@/views/OneThing'
import All from '@/views/All'
import Add from '@/views/Add'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/onething'
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/onething',
      name: 'onething',
      component: OneThing
    },
    {
      path: '/all',
      name: 'all',
      component: All
    }
  ]
})
