import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Brea",
  description: "learn blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Javascript', link: '/javascript/', icon: '🌟' }
    ],

    sidebar: [
      {
        text: 'Javascript',
        items: [
          { text: 'String', link: '/javascript/String' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
