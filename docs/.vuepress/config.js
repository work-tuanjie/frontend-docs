module.exports = {
  title: 'Frontend Develop Document',
  description: 'frontend develop docs.',
  base: '/frontend-docs/',
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
  // theme: 'reco',
  themeConfig: {
    type: 'blog',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // logo: '/logo.png',
    // record: 'xxxx',
    // 作者
    author: 'whaoa',
    // authorAvatar: '/avatar.png',
    // 项目开始时间
    startYear: '2020',
    // 最后更新时间
    lastUpdated: '最后更新时间',
    // 自动生成一个包含了当前页面标题链接的侧边栏
    sidebar: 'auto',
    // 侧边栏标题嵌套深度
    sidebarDepth: 2,
    // // 开启滚动效果
    smoothScroll: true,
    nav: [
      { text: '首页', link: '/' },
      { text: '开发规范', link: '/guide/code' },
      {
        text: '项目归纳',
        items: [
          { text: '找房A+', link: '/projects/saas/' },
        ],
      },
    ],
    sidebar: {
      '/guide/': [        
        { title: '开发规范', path: 'code' },
      ],
      '/projects/saas/': [
        { title: '找房A+ 项目汇总', path: '/projects/saas/' },
        { title: '说明文档 - 按钮类型', path: 'button-type' },
        { title: '权限控制 - 路由菜单', path: 'routes/config-v3.x' },
        { title: '权限控制 - 页面内容', path: 'directives/action' },
      ]
    },
  },
  markdown: {
    // 代码块显示行号
    lineNumbers: true,
  },
  plugins: [
    '@vuepress/nprogress',
    'reading-progress',
    '@vuepress/plugin-medium-zoom',
    // ['@vuepress/plugin-medium-zoom', { selector: '.theme-reco-content :not(a) > img' }],
    // 'cursor-effects',
    // ['dynamic-title', { hideText: '(●—●)喔哟，崩溃啦！' }],
  ],
};
