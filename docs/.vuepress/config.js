module.exports = {
  title: 'frontend',
  description: 'frontend develop docs.',
  dest: 'build',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' } ],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css' }],
  ],
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // logo: '/logo.png',
    // record: 'xxxx',
    // 作者
    author: 'wanghao',
    // authorAvatar: '/avatar.png',
    // 项目开始时间
    startYear: '2020',
    // 最后更新时间
    lastUpdated: '最后更新时间',
    // 自动生成一个包含了当前页面标题链接的侧边栏
    sidebar: 'auto',
    // 侧边栏标题嵌套深度
    sidebarDepth: 2,
    // 开启滚动效果
    smoothScroll: true,
    
    blogConfig: {
      category: { location: 2 },
      tag: { location: 3 },
    },

    friendLink: [
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: '1156743527@qq.com',
        link: 'https://www.recoluan.com',
      },
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        avatar: 'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
        link: 'https://vuepress-theme-reco.recoluan.com',
      },
    ],
    
    nav: [
      { text: '首页', link: '/', icon: 'reco-home' },
      { text: '时间线', link: '/timeline/', icon: 'reco-date' },
      {
        text: '文档',
        link: '/guide/code-guide',
        icon: 'reco-document',
        items: [
          { text: '编码规范', link: '/blogs/guide/code' },
        ],
      },
    ],

    // sidebar: {
    //   '/docs/theme-reco/': ['', 'theme', 'plugin', 'api'],
    // },
  },
  markdown: {
    // 代码块显示行号
    lineNumbers: true,
  },
  plugins: [
    '@vuepress/nprogress',
    'reading-progress',
    ['dynamic-title', { hideText: '(●—●)喔哟，崩溃啦！' }],
  ],
};
