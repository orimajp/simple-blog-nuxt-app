export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // title: 'simple-blog-nuxt-app',
    titleTemplate: 'Simple Blog | %s',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'github-markdown-css',
    '../node_modules/highlight.js/styles/github.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module', // 追加
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    '/api': 'http://localhost:3001',
  },

  markdownit: {
    injected: true,
    // ソースハイライトするためにhighlight.jsと連携
    highlight: (str, lang) => {
      const hljs = require('highlight.js')
      const hljsDefineVue = require("highlightjs-vue")
      hljsDefineVue(hljs)
      hljs.initHighlightingOnLoad()
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (__) {}
      }
      return '' // use external default escaping
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://github.com/nuxt/nuxt.js/issues/9224
    babel: {
      plugins: [['@babel/plugin-proposal-private-property-in-object', { loose: true }]],
    },
  }
}
