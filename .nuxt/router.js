import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _20c0d609 = () => interopDefault(import('../pages/app/index.vue' /* webpackChunkName: "pages/app/index" */))
const _2eb4cd6d = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _007eb84f = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _19521af7 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/app",
    component: _20c0d609,
    name: "app"
  }, {
    path: "/auth/login",
    component: _2eb4cd6d,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _007eb84f,
    name: "auth-register"
  }, {
    path: "/",
    component: _19521af7,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
