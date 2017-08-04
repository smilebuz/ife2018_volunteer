import Vue from 'vue'
import Router from 'vue-router'
import OneThing from '@/views/OneThing'
import All from '@/views/All'
import Add from '@/views/Add'
import Edit from '@/views/Edit'

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
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    }
  ]
})
