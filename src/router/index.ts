import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/index.vue'
import Root from '@/pages/root.vue'
import NotFound from '@/pages/error.vue'
import AuthGuard from './auth-guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/catalog',
      component: Root,
      children: [
        {
          path: "",
          name: 'Catalog',
          component: () => import("@/pages/catalog/index.vue"),
          meta: {
            title: 'Catalog',
          },
        },
        {
          path: ":id",
          name: 'CatalogView',
          component: () => import("@/pages/catalog/view/_id.vue"),
          meta: {
            title: 'Catalog Id',
          },
        },
      ]
    },
    {
      path: '/cart',
      component: Root,
      children: [
        {
          name: 'Cart',
          path: '',
          component: () => import("@/pages/cart/cart.vue"),
          meta: {
            title: 'Корзина',
          },
        },
      ]
    },
    {
      path: '/my',
      beforeEnter: AuthGuard,
      component: Root,
      children: [
        {
          name: 'My',
          path: '',
          component: () => import("@/pages/my/index.vue"),
          meta: {
            title: 'Личный кабинет',
          },
        },
      ]
    },
    {
      path: '/login',
      component: Root,
      children: [
        {
          name: 'Login',
          path: '',
          component: () => import("@/pages/login.vue"),
          meta: {
            title: 'Авторизация',
          },
        },
      ]
    },
    {
      path: '/graphql-test',
      component: Root,
      children: [
        {
          name: 'graphql_test',
          path: '',
          component: () => import("@/pages/graphql-test.vue"),
          meta: {
            title: 'graphql',
          },
        },
      ]
    },
    {
      path: '/graphql',
      component: Root,
      beforeEnter: AuthGuard,
      children: [
        {
          name: 'graphql',
          path: '',
          component: () => import("@/pages/graphql/index.vue"),
          meta: {
            title: 'graphql',
          },
        },
        {
          path: ":id",
          name: 'GraphqlView',
          component: () => import("@/pages/graphql/view/_id.vue"),
          meta: {
            title: 'Graphql',
          },
        },
      ]
    },
    {
      path: '/users',
      component: Root,
      children: [
        {
          name: 'users',
          path: '',
          component: () => import("@/pages/graphql_test/graphql-test1.vue"),
          meta: {
            title: 'Users',
          },
        },
        {
          path: ":id",
          name: 'GraphqlTestView',
          component: () => import("@/pages/graphql_test/view/_id.vue"),
          meta: {
            title: 'graphql_test_view_1',
          },
        },
      ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]
})

export default router
