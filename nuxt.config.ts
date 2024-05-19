import { Buffer } from 'buffer'
// import inject from '@rollup/plugin-inject'
// import Inspect from 'vite-plugin-inspect'
global.Buffer = Buffer || global.Buffer
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export default defineNuxtConfig({
  css: ['@blocksuite/editor/themes/affine.css', '~/styles/global.css'],
  modules: [
    '@vue-macros/nuxt',
    '@vueuse/nuxt',
    '@nuxt/devtools',
    '@unocss/nuxt',
    "@nuxthub/core",
    '@element-plus/nuxt'
  ],
  vite: {
    define: {
      'process.env.FORCE_COLOR': 'undefined',
      global: 'globalThis' ,
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
      exclude: ['../react'],
    },
  },
  app: {
    head: {
      title: 'Nuxt AFFiNE demo',
    },
  },
  hub: {
    database: true,
  },
})