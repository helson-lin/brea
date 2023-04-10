/**
 * @type {import('vitepress').UserConfig}
 */
import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Brea",
  description: "learn note",
  head: [],
  lastUpdated: true,
  themeConfig: {
    logo: "/favicon.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/', },
      { text: 'Javascript', link: '/javascript/' },
      {  text: 'Vue', link: '/vue/' },
      { text: 'Linux', link: '/linux/' },
      {  text: '业务', link: '/bussiness/' },
      { text: '语', link: '/talk/' },
    ],
    sidebar: {
      '/javascript/': [
        {
          text: 'Javascript基础',
          items: [
            { text: 'String类型的基本方法', link: '/javascript/String' },
            { text: 'Number类型的基本方法', link: '/javascript/Number' },
            { text: 'Object原型上的方法', link: '/javascript/Object' },
          ]
        },
        {
          text: 'Javascript进阶',
          items: [
            { text: 'Meta/Script标签属性', link: '/javascript/MetaScript' },
            { text: '内存回收机制♻️', link: '/javascript/MemoryRecoveryMechanism' },
            { text: '闭包问题', link: '/javascript/Closures' },
            { text: '深入理解Promise', link: '/javascript/PromiseBase' },
            { text: 'Promise原型方法', link: '/javascript/Promise' },
            { text: '设计模式', link: '/javascript/Design' }
          ]
        },
      ],
      '/bussiness': [
        {
          text: '业务',
          items: [
            { text: 'SSO', link: '/bussiness/sso' },
          ]
        }
      ],
      '/vue': [
        {
          text: 'Vue3',
          items: [
            { text: '基础知识', link: '/vue/Base' },
          ]
        }
      ],
      '/linux': [
        {
          link: '/linux/NginxBase',
          text: 'Nginx基础配置',
        }
      ],
      '/talk/': [
        {
          text: '工具库积累',
          link: '/talk/NpmRe'
        },
        {
          text: '项目常见问题',
          link: '/talk/ProjectProblem'
        },
        {
          text: 'PM2启动Node之外的项目',
          link: '/talk/pm2'
        },
        {
          text: 'MP4转RTSP推流（ffmpeg和easydarwin）',
          link: '/talk/RtspPush'
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/helson-lin/brea' }
    ]
  }
})
