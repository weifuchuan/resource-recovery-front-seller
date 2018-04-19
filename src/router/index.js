import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/appoint"
    },
    {
      name: "appoint",
      path: '/appoint',
      component: () => import("src/components/appoint/appoint")
    },
    {
      name: "order-list",
      path: '/order-list',
      component: () => import("src/components/orderList/orderList")
    },
    {
      name: "user",
      path: '/user',
      component: () => import("src/components/user/user")
    },
    {
      path: "/clazzes/:name",
      component: () => import("src/components/clazzesPanel/clazzesPanel")
    },
    {
      path: "/create-order",
      component: () => import('src/components/createOrder/createOrder')
    },
    {
      path: "/select-contact/:id",
      component: () => import('src/components/selectContact/selectContact')
    },
    {
      path: "/edit-contact/:id",
      component: () => import('src/components/editContact/editContact'),
    },
    {
      path: "/bill",
      component: () => import('src/components/bill/bill'),
    },
  ]
})
