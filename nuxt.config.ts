// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true,
  },

  ssr: true,

  compatibilityDate: '2024-04-03',
  srcDir: 'src/',
  alias: {
    '@/*': './src/*',
  },

  devtools: { enabled: true },
  css: ['~/styles/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/',
      include: ['/'],
      exclude: ['/register', '/images/*'],
      cookieRedirect: false,
    },
  },

  modules: ['@nuxt/image', 'nuxt-svgo', '@nuxtjs/supabase', '@nuxt/eslint'],
});
