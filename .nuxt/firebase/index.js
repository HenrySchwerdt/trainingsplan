import createApp from './app.js'

import authService from './service.auth.js'
import firestoreService from './service.firestore.js'
import performanceService from './service.performance.js'
import analyticsService from './service.analytics.js'
import remoteConfigService from './service.remoteConfig.js'

const appConfig = {"apiKey":"AIzaSyBcW6ZsRLVq9D5ZYxcYYFer0dOWdj_06kM","authDomain":"trainingsplan-bc40a.firebaseapp.com","projectId":"trainingsplan-bc40a","storageBucket":"trainingsplan-bc40a.appspot.com","messagingSenderId":"410898683145","appId":"1:410898683145:web:d945f9ed8a904a1b092fd8"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.server) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
    firestoreService(session, firebase, ctx, inject),

    ]
  }

  if (process.client) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
      firestoreService(session, firebase, ctx, inject),
      performanceService(session, firebase, ctx, inject),
      analyticsService(session, firebase, ctx, inject),
      remoteConfigService(session, firebase, ctx, inject),

    ]
  }

  const [
    auth,
    firestore,
    performance,
    analytics,
    remoteConfig
  ] = await Promise.all(servicePromises)

  const fire = {
    auth: auth,
    firestore: firestore,
    performance: performance,
    analytics: analytics,
    remoteConfig: remoteConfig
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}