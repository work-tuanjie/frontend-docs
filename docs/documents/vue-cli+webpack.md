---
title: vue.config.js 从入门到入土
date: 2020-10-22
publish: true
categories:
  - Vue
tags:
  - Vue CLI
  - WebPack
---

## Vue CLI 是个啥？

`Vue CLI` 是一个 `Vue.js` 项目的快速开发脚手架工具，它内置了一份适用于 `Vue.js` 开箱即用的一系列配置，方便我们可以快速开始项目开发。它提供了以下几点功能：

- 可交互式的创建引导
- 提供官方扩展插件集合
- 图形化管理界面

## 安装及使用

### 安装

我们可以通过以下命令来安装它：

``` bash
yarn global add @vue/cli
# OR
npm install -g @vue/cli

# 查看当前安装版本
vue --version
```

如果遇到网络问题，导致安装过慢，可以安装 `yrm` / `nrm` 来切换 `Node.js` 包管理工具的源地址。

``` bash
# 管理源地址，这里以 yarn 为例
yarn global add yrm

# 查看源地址列表
yrm ls

# 切换到淘宝镜像地址
yrm use taobao
```

### 创建项目

我们可以通过以下命令来快速创建一个 `Vue.js` 项目

> 具体选项这里不再做过多赘述，可以参考[官方文档](https://cli.vuejs.org/zh/guide/creating-a-project.html)

``` bash
vue create hello-world
```

## 环境变量

### 内置模式

因为 `Vue CLI` 是基于 `WebPack` 的，所以支持 `WebPack` 的环境变量功能。使用 `Vue CLI` 创建一个项目时会默认包含以下三个模式：

- `development` 模式用于 `vue-cli-service serve`
- `production` 模式用于 `vue-cli-service build` 和 `vue-cli-service test:e2e`
- `test` 模式用于 `vue-cli-service test:unit`

这三个环境变量我们可以在项目中任意位置的 `*.js` 文件中通过 `process.env.NODE_ENV` 来进行访问。
除了 `NODE_ENV` 外，项目中还包含另外一个环境变量：`BASE_URL`，它是 `vue.config.js` 中的 `publicPath` 选项选项的值。

### 配置文件

我们可以给某个模式单独制定环境变量来区分不同的运行环境，一个特定模式的环境文件 (如 `.env.production`) 会比一般的环境文件 (如 `.env`) 拥有更高的优先级。

::: warning
环境变量配置文件中不应该出现默认存在的 `NODE_ENV`，如果有特殊情况需要设置，需要通过 `npm script` 启动脚本来制定模式：`vue-cli-service build --mode [mode]`
:::

```bash
.env                # 全局配置文件，在所有的环境中被载入
.env.local          # 用于本地配置特殊的变量，在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

### 自定义变量

配置文件中只允许存在 `键=值` 的数据，可以在配置文件中使用以 `VUE_APP_` 开头的格式来定义变量，在构建时该代码会被直接替换为配置文件中的值。

在 `JavaScript` 文件中可以通过 `process.env.VUE_APP_*` 来使用。

在 `HTML` 文件中可以通过以下语法来插入表达式

`<%= VALUE %>` 插入变量 (`.env` 或者 `webpack-html-plugin`) 不会被处理，会被原样输出。
`<%- VALUE %>` 插入变量，内容会被转义后再插入。
`<% expression %>` 插入 JavaScript 代码。

## 配置

### 静态资源处理规则

这里请参考 [官方说明文档](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#url-%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99)

### 基本配置

`vue.config.js` 是一个可选的配置文件，`@vue/cli-service` 会自动在项目的根目录 (和 package.json 同级的) 去加载。`Vue CLI` 也支持我们直接使用 `package.json` 中的 `vue` 字段来编写一些配置。

::: warning 建议
强烈建议使用单文件的方式来处理项目配置，避免因配置项过多导致 `package.json` 文件过于复杂。
:::

这个文件最终会被传递给 `WebPack` 使用，需要遵从 `Node.js` 的语法规范，我们需要使用 `CommonJS` 的方式来到处一个配置对象

``` javascript
module.exports = {};
```

```javascript
module.exports = {
    publicPath: '/',                                           // 部署应用包时的基本 URL (同 webpack 的 output.publicPath，但始终不要使用 webpack 的配置项)
    outputDir: 'dist',                                         // 执行 build 指令时创建的目录
    assetsDir: '',                                             // 构建后用来存放静态资源的目录 (相对于 outputDir，默认不使用)
    indexPath： 'index.html',                                  // 构建后生成的 index.html 的输出路径 (相对于 outputDir)
    lintOnSave: 'default',                                     // 是否在开发环境下每次保存时 lint 代码
    transpileDependencies: [],                                 // 默认情况下 babel-loader 会忽略 node_modules 中的文件。如果想要通过 Babel 转译一个依赖，可以使用这个选项
    productionSourceMap: true,                                 // 生产环境下是否生成 source map 文件
    configureWebpack: {},                                      // webpack 配置对象，如果是函数，则接收配置作为参数。可直接修改参数，也可以返回一个新对象，最终会被 webpack-merge 与默认配置进行合并
    chainWebpack: () => {},                                    // 函数，接收一个 webpack-chain 的配置实例。允许对内部的 webpack 做更详细的配置
    css: {
        sourceMap: false,                                      // 是否为 CSS 开启 source map
        loaderOptions: {}                                      // 配置 CSS 相关的 loader 选项
    },
    devServer: {
        // proxy: 'http://xxxx'                                // 将任何未知请求 (没有匹配到静态文件的请求) 代理到 http://xxxx
        proxy: {
            '/api': {                                          // key 是一个符合 micromatch 标注的字符串
                target: 'http://xxxx',                         // /api/foo/bar -> http://xxxx/api/foo/bar
                pathRewrite: {                                 // key 是一个用于匹配路径的正则字符串
                    '^/remove/api': '',                        // 去掉 url 中的 /remove/api
                },
                pathRewrite (path, req) {                      // 使用函数进行处理
                    return path.replace('/api', '/base/api')
                },
                ws: true,                                      // 是否代理 websocket
                changeOrigin: true,                            // 是否将请求头中的 host 改为 目标地址
                toProxy: false,                                // 是否将绝对 URL 转为 path (用于代理到系统代理)
                headers: {},                                   // 添加请求头参数
            },
        },
    },
};
```

## 扩展

- 单元测试：`Jest` / `Mocha` + `Chai`
- `Git Hook`：在 `Commit` 之前使用 `ESLint` 检查代码，通过后检查 `Commit Message` 是否符合要求。如果不符合则抛出错误，终止 `Commit`
    + `Husky`
    + `commitizen`
    + `@commitlint/cli`
