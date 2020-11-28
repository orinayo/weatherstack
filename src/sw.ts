/* eslint-disable no-restricted-globals */
/// <reference types="../node_modules/types-serviceworker" />
/// <reference types="../node_modules/types-serviceworker/lib/workbox" />
import {precacheAndRoute, createHandlerBoundToURL} from 'workbox-precaching'
import {StaleWhileRevalidate} from 'workbox-strategies'
import {
  registerRoute,
  setCatchHandler,
  setDefaultHandler,
  NavigationRoute,
} from 'workbox-routing'
import {ExpirationPlugin} from 'workbox-expiration'
import {CacheableResponsePlugin} from 'workbox-cacheable-response'

precacheAndRoute(self.__WB_MANIFEST || [])

const navigationRoute = new NavigationRoute(
  createHandlerBoundToURL('/index.html') as any,
  {
    denylist: [/^\/_/, /\/[^/?]+\.[^/]+$/, /\/activate\b/, /^\/api/],
  },
)

registerRoute(navigationRoute)

const defaultStrategy = new StaleWhileRevalidate({
  cacheName: 'default',
  plugins: [
    new ExpirationPlugin({
      maxEntries: 128,
      maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
      purgeOnQuotaError: true, // Opt-in to automatic cleanup
    }),
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
})

// Use a stale-while-revalidate strategy for all other requests.
setDefaultHandler({
  handle: args => {
    //@ts-expect-error
    if (args && args.event?.request?.method === 'GET') {
      return defaultStrategy.handle(args)
    }
    //@ts-expect-error
    return fetch(args?.event?.request)
  },
})

setCatchHandler(() => {
  return new Promise(res => {
    res(Response.error())
  })
})

self.addEventListener('activate', () => {
  return self.clients.claim()
})

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
