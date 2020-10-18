---
title: WEB前端代码开发规范
date: 2020-10-10
sticky: 1
categories:
  - 文档
tags:
  - Vue
  - 开发规范
---

## 目录

[[toc]]

## 规范目的

为提高团队协作效率，便于前端后期优化维护，输出高质量的文档。

> 坚持制定好的代码规范，无论团队人数多少，代码应该同出一门。[@AlloyTeam](http://alloyteam.github.io/CodeGuide/)

## 基本原则

### 文件结构分离

尽量确保同一类型的文件放到统一的目录下，进行统一管理，避免无意义的多级目录嵌套。

### 缩进
统一两个空格缩进，不要使用 Tab 或者 Tab、空格混搭。

### 使用小写字母

在非必要情况下因尽量保证以下内容使用小写字母进行编写，杜绝大小写混用。

- `HTML` 中的 **标签名**， **属性名**
- `CSS` 中的 **属性名**， **属性值**
- `Vue Template` 中的 **`props`**， **`event`**， **组件名**

```html
<!-- 推荐 -->
<img src="google.png" alt="Google">

<!-- 不推荐 -->
<A HREF="/">Home</A>
```

```css
/* 推荐 */
color: #e5e5e5;

/* 不推荐 */
color: #E5E5E5;
```

### 统一注释风格

- 注释的缩进与下方代码保持一致
- 行内注释需要与前后内容间保留一个空格
- 单行注释标识与注释主体内容间应始终保留一个空格

**`HTML`**

```html
<!-- 文章列表列表模块 -->
<div class="article-list">
  <!-- ... -->
</div>
```

**`CSS`**

```css
/* =================================
                组件块
 ================================ */

/* 子组件块 */
.selector {
  padding: 15px;
  margin-bottom: 15px;
}

/* 子组件块 */
.selector-secondary {
  display: block;
}
```

**`JavaScript`**

- 避免在单行内使用 `/* text */` 这样的多行注释。当需要有多行注释内容时，使用多个单行注释。
- 始终对 函数 / 方法 / 构造器 编写注释，建议使用 [JSDoc 语法](http://yuri4ever.github.io/jsdoc/)

```javascript
/**
 * 函数描述
 * @param {string} a 参数1的说明
 * @param {number} [b=0] 参数2的说明
 * @return {Number} 返回值描述
 */
function sum(a, b = 0) {
  // 计算 a 和 b 相加的结果并返回
  return a + b;
}
```

### 外链资源 URL 协议

使用 外链资源（图片及其它媒体资源）URL中统一使用 `https` 协议（需保证 外链资源 可以在 `https` 环境下进行访问）。

**`HTML`**

```html
<!-- 推荐 -->
<script src="https://www.xxx.cn/statics/js/autotrack.js"></script>
```

**`CSS`**

```css
/* 推荐 */
.example {
  background: url("//www.google.com/images/example");
}

/* 不推荐 */
.example {
  background: url("http://www.google.com/images/example");
}
```

## 目录结构

如果没有特殊情况，建议统一使用下面的目录结构作为基础，在此之上进行后续开发。如果没有特殊声明，目录及文件建议使用 `kebab-case` 全小写 + 连接符(-) 的方式进行命名。

```
├── dist                       # 构建相关
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directives             # 全局指令
│   ├── filters                # 全局 filter
│   ├── layouts                # 全局 layout
│   ├── mock                   # 项目 mock 模拟数据
│   ├── plugins                # 项目中所依赖的插件封装
│   ├── router                 # vue-router 配置文件
│   ├── store                  # vuex 配置文件
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局工具方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   └── main.js                # 入口文件 加载组件 初始化等
├── tests                      # 测试文件
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

### Components

该目录用来存放所有用于全局注册的组件，目录及文件命名方式建议使用如下结构。

- 组件目录命名应始终使用大驼峰方式
- 即使组件只有一个文件也应放到组件目录下进行管理，方便后期进行扩展
- 组件目录内不应出现多级 `components` 目录的嵌套，如层级过深，请重新考虑该组件拆分是否合理
- `@/components` 下应提供一个 `index.js` 用于对当前目录下的组件进行统一注册

```
├── components                 # @/components 目录
│   └── Header                 # 组件目录
│       ├── components         # 当前组建依赖的其他组件
│       │   └── Navbar.vue     # 组件文件
│       ├── index.vue          # 组件入口文件
│       └── index.js           # 入口文件， 与 index.vue 二选一， 当该组件为多个组件构成时或使用 index.vue 存在歧义时使用该文件，否则优先使用 index.vue
```

### Views

该目录用来存放所有页面布局文件，建议结合原型图及设计稿根据视图模块进行拆分。

该目录下的文件及文件夹建议使用 `kebab-case` 全小写 + 连接符(-) 的方式进行命名。文件目录结构不做强制要求，根据实际情况合理规划即可。

### Utils

该目录用来存放所有用于全局使用的工具方法。

开发成员应按工具方法的实际用途进行合理分类，每个类别单独创建文件，避免多种用途方法混在同一个文件内，增加后期维护成本。

### API

该目录用于存放项目中所用到的 API 请求封装，目录结构结合后端数据接口层级进行模块划分。

#### 示例

假设前端页面中有三个相同类型的页面：

- 新房
- 二手房
- 小区

它们同属于一个房源模块，我们可以将它们放到 `@/api/house.js` 中进行管理。

在后端所提供的 `RESTful` 数据接口中这三个功能属于三种不同的资源，可以将接口请求按以下风格进行组合。
> 如果同一个文件中多个资源的接口使用方式相同，则可以考虑在文件中定义工厂函数，通过函数生成接口请求对象进行导出，减少冗余代码。

```javascript
// @/api/house.js
import request from '@/plugin/request';

const API = {
  newHouse: '/house/new',
  community: '/house/community',
}

/**
 * 新房相关
 */
export const newHouse = {
  /**
   * 新房列表
   * @param {String} [filter=''] - 过滤参数
   * @param {Number} [page=1] - 分页页数
   * @param {Number} [size=20] - 每页数据数量
   * @return {Promise}
   */
  get ({ filter = '', page = 1, size = 20 } = {}) {
    return request.get(API.newHouse, { params: { filter, page, size } });
  },

  /**
   * 新房详情
   * @param {Number|String} id - 房源id
   * @param {...Object} - 其他 query 参数组成的参数对象
   * @return {Promise}
   */
  info ({ id, ...params } = {}) {
    if (!id) return Promise.reject({ msg: '缺少 id 参数' });
    return request.get(`${API.newHouse}/${id}`, { params });
  },
};

/**
 * 小区相关
 */
export const community = {
  // ...
};


// @/views/house/new
import { newHouse } from '@/api/house';
// 获取列表数据
newHouse.get().then();
// 获取房源详情
newHouse.info({ id: 1 }).then();
```

## 代码风格规范

建议在所有前端项目中开启 `Lint` 进行代码风格检查，保证团队项目代码风格的规范统一。

:::danger
团队中个人不允许擅自修改项目中的 `ESLint` 配置文件，如有特殊需求，需要与项目负责人进行沟通，确保在不影响其他成员开发情况下进行配置调整。
:::

### HTML

#### 基本语法

- `DOCTYPE` 使用全大写
- 嵌套的节点应该缩进
- 属性名全小写，用中划线做分隔符
- 在属性值上，使用双引号，不要使用单引号
- `Boolean` 属性不需要属性值，存在表示取值为 `true`，不存在则表示取值为 `false`。
- 不要在自动闭合标签结尾处使用斜线（HTML5 规范 指出他们是可选的）


:::warning 警告
在编写HTML代码时，需要尽量避免多余的父节点，使用尽量小的复杂度和尽量少的标签来解决问题。
:::

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page title</title>
  </head>
  <body>
    <img src="images/company_logo.png" alt="Company">
    <h1 class="hello-world">Hello, world!</h1>
    <input type="text" disabled>
  </body>
</html>
```

#### 属性顺序

属性应该按照特定的顺序出现以保证易读性

- `id`
- `class`
- `name`
- `data-*`
- `src`, `for`, `type`, `href`, `value`
- `required`, `readonly`, `disabled`
- `placeholder`, `title`, `alt`

`id`, `class`, `name` 都具有标识性，所以优先书写。`data-*` 为自定义属性，需要用于其他操作，优先于其他变动较少的属性。

### CSS / SCSS / LESS

- 尽量少用或不用 `*` 选择器
- 选择器不要超过4层
- 不允许有空的规则
- 元素选择器用小写字母
- 属性值 0 后面不要加单位
- 不要在同个规则里出现重复的属性
- 不要在一个文件里出现两个相同的规则
- 无前缀的标准属性应该写在有前缀的属性后面
- 颜色16进制用小写字母, 尽量用简写
- `class`, `id` 使用小写字母, 以中划线分隔
- `url`, 属性选择器中的属性值 要使用双引号
- 预处理器 中的变量、函数、混合等 采用驼峰式命名

#### 空格

以下几种情况**需要空格**：

- 属性值前
- 选择器 `>`, `+`, `~` 前后
- `{` 前
- `!important` `!` 前
- `@else` 前后
- 属性值中的 `,` 后
- 注释 `/*` 后和 `*/`前

以下几种情况**不需要空格**：

- 属性名后
- 多个规则的分隔符 `,` 前
- `!important` 的 `!` 后
- 属性值中 **`(` 后** 和 **`)` 前**
- 行末不要有多余的空格

```scss
.element {
  color: red !important;
  background-color: rgba(0, 0, 0, .5);
}

.element > .dialog{
  ...
}

.element {
  ...
}

@if {
  ...
} @else {
  ...
}

```

#### 换行

以下几种情况需要空行：

- 文件最后保留一个空行
- `}` 后最好跟一个空行，包括 预处理器 中嵌套的规则

```scss
.element {
  ...
}

.dialog {
  color: red;

  &:after {
    ...
  }
}

```

### JavaScript

- 最外层统一使用单引号
- 双斜线后必须跟一个空格, 缩进与下一行代码保持一致, 可位于一个代码行的末尾但需要与代码间隔一个空格
- 变量使用 `let` 进行声明
- 变量不要先使用后声明
- 不要声明了变量却不使用
- 不要在同个作用域下声明同名变量
- 不要在循环内部声明函数
- 尽量使用全等方式进行判断
- 不要在内置对象的原型上添加方法，如 `Array`, `Date`
- `debugger` 不要出现在提交的代码里
- 不允许有空的代码块，行尾不要有空白字符
- 变量声明块与逻辑代码块之间保留一个空行

#### 空格与分号


以下几种情况一定要写空格：

- 三元运算符 `?`, `:` 前后
- 同行书写时逗号后必须要有空格
- 代码块 `{` 前
- 下列关键字前：`else`, `while`, `catch`, `finally`
- 下列关键字后：`if`, `else`, `for`, `while`, `do`, `switch`, `case`, `try`, `catch`, `finally`, `with`, `return` (仅有返回值时需要), `typeof`
- 单行注释 `//` 后（若单行注释和代码同行，则 `//` 前也需要），多行注释 `*` 后
- 对象的属性值前
- `for` 循环的分号后留有一个空格
- 无论是函数声明还是函数表达式，`{` 前一定要有空格
- 函数的参数之间

```javascript
let a = { b: 1 };

let z = a.b ? 1 : 2;

for (let i = 0; i < 6; i++) {
  z++;
}
```

以下几种情况后需加分号：

- 变量声明
- 表达式
- `return`
- `throw`
- `break`
- `continue`
- `do-while`

```javascript
let x = 0;

x++;

do {
  x++;
} while (x < 10);
```

#### 变量声明

- 变量必须采用小驼峰式命名
- 常量全大写，用下划线连接
- 构造函数使用大驼峰，首字母大写
- 一个函数作用域中所有的变量声明尽量提到函数首部
- 对上下文 `this` 的引用只能使用 `_this` 来命名
- `URL` 在变量名中全大写，`Android` 在变量名中大写第一个字母，`iOS` 在变量名中小写第一个，大写后两个字母

#### 数组、对象

- 对象属性名不需要加引号
- 数组元素间使用 `, ` 进行分割
- 以缩进形式书写时，最后一个元素末尾需要有逗号 (对于 Git 友好)
- 以单行形式书写时，最后一个元素末尾不要有逗号，对象 `{` 后 和 `}` 前 各保留一个空格
- 对象取值时，当 `key` 不是变量时，禁止使用 `foo['bar']`，必须写成 `foo.bar`

```javascript
const obj1 = { b: 1 };
const obj2 = {
  b: 1,
  c: 2,
};

const arr1 = [0, 1, 2];
const arr2 = [
  0,
  1,
  2,
];
```

#### 函数

- 无论是函数声明还是函数表达式，`(` 前不要空格，但 `{` 前一定要有空格
- 立即执行函数外必须包一层括号
- 参数之间用 `, ` 分隔
- 有默认值的参数必须放在函数参数的末尾
- 必须只使用函数声明或只使用函数表达式
- 复杂的函数，所有类，都必须进行函数注释

```javascript
const doSomething1 = function (item) {
  // do something
};

function doSomething (item) {
  // do something
}

doSomething(item);

(function() {
  // do something
})();
```

#### 逻辑规则

- 禁止函数在不同分支返回不同类型的值
- 数组方法除了 `forEach` 之外必须有返回值
- 在类的非静态方法中，必须存在对 `this` 的引用
- 当代码中出现 `setter` 时，同位置下必须有对应的 `getter` 方法，且 `getter` 必须有返回值
- 代码块嵌套的深度禁止超过 5 层，通过变更判断逻辑提前执行 `return`
- 回调函数嵌套禁止超过 3 层，多了请用 `async await` 替代
- 禁止将 `async` 函数做为 `new Promise` 的回调函数 (出现这种情况时，一般不需要使用 `new Promise` 实现异步了)

> [Promise MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### Vue

- 标签属性必须按规则排序 [(vue/attributes-order)](https://eslint.vuejs.org/rules/attributes-order.html)
- 标签属性过多时，必须全部折行，属性与标签名保持一个缩进(2个空格)
- 组件必须有 `name` 属性，且必须符合 `PascalCase` 大驼峰
- 组件内 `style` 必须添加 `scope` 属性
- 组件如果不需要插槽内容尽量使用自闭合形式
- `props` 必须有类型限制，如果不是 `required` 的字段，必须有默认值；如果类型为应用型地址，则需要通过函数返回默认值
- `render` 函数必须有返回值
- `v-for` 指令的元素必须有 `key`
- 避免把 `v-if` 和 `v-for` 同时用在同一个元素上，`v-for` 的优先级高于 `v-if`

```vue
<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
  export default {
    components: {},
    mixins: [],
    props: {
      list: {
        type: Array,
        default: () => [],
      },
    },
    data () {
      return {
        value: '',
      }
    },
    methods: {},
  }
</script>

<style scope></style>
```
