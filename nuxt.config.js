export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Phone-Catalogue',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Responsive phone-catalogue template built with Vue.js and Nuxt.js' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: 'https://example.com/image.jpg' },
      { name: 'theme-color', content: '#ffffff' },

      // Facebook open graph
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://example.com/page.html' },
      { property: 'og:title', content: 'Content Title' },
      { property: 'og:image', content: 'https://example.com/image.jpg' },
      { property: 'og:description', content: 'Description Here' },
      { property: 'og:site_name', content: 'Site Name' },
      { property: 'og:locale', content: 'en_US' },

      // Twitter card
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:site', content: '@site_account' },
      { property: 'twitter:creator', content: '@individual_account' },
      { property: 'twitter:url', content: 'https://example.com/page.html' },
      { property: 'twitter:title', content: 'Content Title' },
      { property: 'twitter:description', content: 'Content description less than 200 characters' },
      { property: 'twitter:image', content: 'https://example.com/image.jpg' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      src: 'bulma/bulma.sass',
      lang: 'sass'
    }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vuex-persistedstate',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/font-awesome'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/' // Used as fallback if no runtime config is provided
  },

  // Router module configuration: https://nuxtjs.org/docs/2.x/get-started/routing/
  router: {
    base: '/phones'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  }
}
