// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2024-04-03',
//   devtools: { enabled: true },
// })

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default {
  app: {
    head: {
      title: "Pilm",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Bro is Yapping' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/icon.png' }
      ]
    }
  },
  // routeRules: {
  //   '/api/1/**': {
  //     proxy: { to: "http://localhost:8998/**", },
  //   }
  // },

  // routeRules: {
    // '/api/**': { proxy: { to: "http://localhost:8998/**" } }
  // },
  // routeRules: {
  //   '/api/**': {
  //     // enable CORS
  //     cors: true, // if enabled, also needs cors-preflight-request.ts Nitro middleware to answer CORS preflight requests
  //     headers: {
  //       // CORS headers
  //       'Access-Control-Allow-Origin': '*', // 'http://example:6006', has to be set to the requesting domain that you want to send the credentials back to
  //       'Access-Control-Allow-Methods': '*', // 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  //       'Access-Control-Allow-Credentials': 'true',
  //       'Access-Control-Allow-Headers': '*', // 'Origin, Content-Type, Accept, Authorization, X-Requested-With'
  //       'Access-Control-Expose-Headers': '*',
  //       // 'Access-Control-Max-Age': '7200', // 7200 = caching 2 hours (Chromium default), https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age#directives
  //     },
  //   },
  // },
  tailwindcss: {
    cssPath: '~/assets/css/tailwinds.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    viewer: true,
  },

  ssr: false,
  compatibilityDate: '2024-09-25',
  experimental: {
    renderJsonPayloads: false
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    // '@nuxtjs/axios',
    //...
  ],
  colorMode: {
    classSuffix: '',
  },

  buildModules: [
    "@nuxtjs/axios",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  publicRuntimeConfig: {
    BASE_URL: "http://localhost:8998/",
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  axios: {
    // proxy: true
  },


  // plugins: [
  //   // '~/plugins/vuetify.js',
  //   '~/plugins/axios.js',
  // ],


};
