---
title: ZhaofangA+ | Route Config
publish: false
date: 2020-12-09
categories:
  - 帮助文档
tags:
  - ZhaofangA+
  - Help Docs
  - 找房A+
---

## 目录

该文档用于描述 **找房A+** 项目中的前端路由规则配置方式，以及路由间数据通信的实现方式。

[[toc]]

## 更新描述

### 安全更新

::: tip Safe Change
- `API` 数据整体格式保持 `v2.x` 版本格式不变，存在以下调整
  - 移除 `path` 字段
  - 仅在 `menu_type === page(3)` 时需要 `name` 字段
  - 添加 `menu_type = link(4)` 作为外链菜单类型
- 添加 `AlTabs` 组件用于渲染 标签页/选项卡，并提供页面跳转功能
- `AlContainer` 组件内添加 `slot:top` 插槽，用于放置主体元素上方的内容
- 支持在路由配置对象中通过 `activeMenuName` 来手动制定路由对应的高亮菜单
:::

### 破坏性更新

::: danger Break Change
- 废弃 `v2.x` 中使用的父子路由形式的开发方式，页面内所有内容统一通过一个路由进行展示
- 由于 `API` 中移除了 `path` 字段，需要在前端配置文件中指定 `path`
- 原 `AlContainer` 组件内添加 `slot:panel` 相关插槽，将在迁移完成后被废弃
- 原有 `BaseTab` 混入将在迁移完成后被废弃
:::

### 开发提示

::: warning
- 在开发过程中请始终保持开发规范中的代码编写方式
- 以下内容统一使用 `CamelCase` (大驼峰) 的方式命名
  - 路由规则的 `name`
  - 组件的目录及文件
- 如无特殊声明，所有的文件及目录均使用 `kebab-case` (短横线分隔) 的方式命名
- 项目根目录下 `.env.development` 文件不允许进行修改，该文件是作为开发环境的默认代理配置文件，便于非前端开发文件进行使用，如需进行代理切换请在该文件同级新建 `.env.development.local` 文件编写相同变量名进行覆盖来实现，该文件不会参与 `Git` 的版本控制
:::

## 路由配置

``` ts
interface Route {
  title: string;           // 菜单标题
  name?: string;           // 路由唯一标识 => menu_type = 3 时必须
  icon?: string;           // 菜单图标
  hidden?: HiddenType;     // 菜单是否隐藏 => 见下方 HiddenType 枚举
  menu_type: RouteType;    // 路由类型 => 见下方 RouteType 枚举
  child?: Route[];         // 子级数据
  action?: string[];       // 操作权限信息，用于控制页面中按钮的权限描述数组
}
```

### 显示状态

``` ts
enum HiddenType {
  show = 0,    // 显示
  hidden,      // 隐藏
}
```


### 路由类型

``` ts
enum RouteType {
  group = 1,     // 折叠菜单组
  tab,           // 标签页
  page,          // 页面
  link,          // 外链
}
```


## 类型说明

![楼盘列表.png](https://i.loli.net/2020/12/24/mQjGvB95ypbrHgh.png)
<!-- ImageRemoveLink: https://sm.ms/delete/5mvhkeNsl6BSZjX3bD1t8TPMz2 -->


### 折叠菜单组

即点击该数据对应的菜单**不会发生路由跳转行为**，仅作展示状态切换的类型，当作菜单分组来处理，则这个路由规则的 `menu_type` 为 `group(1)`。

例如：上图中 顶部导航中的 **工作台**，侧边栏中的 **楼盘字典**

::: details 点击查看 API 配置数据
```json
{
  "path": "",
  "name": "",
  "title": "工作台",
  "icon": "el-icon-user-solid",
  "hidden": 0,
  "menu_type": 1,
  "child": [
    {
      "path": "/workbench/home",
      "name": "Home",
      "title": "首页",
      "hidden": 0,
      "menu_type": 3
    }
  ]
}
```
:::

::: details 点击查看 前端路由 配置数据
```js
export default {
  Home: {
    path: '/workbench/home',
    component: () => import(/* webpackChunkName: "demo" */ 'home.vue'),
    // 非 VueRouter 配置字段将被合并到 $route.meta 中
    customProp: 'test',
  },
};
```
:::

### 标签页

点击后跳转的页面中包含选项卡，则这个路由规则的 `menu_type` 为 `tab(2)`，

例如：上图中 侧边栏中的 **楼盘列表**

::: details 点击查看 API 配置数据
```json
{
  "path": "dictionary",
  "name": "Dictionary",
  "title": "楼盘列表",
  "icon": "el-icon-office-building",
  "hidden": 0,
  "menu_type": 2,
  "child": [
    {
      "path": "exist",
      "name": "FloorExist",
      "title": "系统已有楼盘",
      "hidden": 0,
      "menu_type": 3
    },
    {
      "path": "new",
      "name": "FloorNew",
      "title": "申报的新楼盘",
      "hidden": 0,
      "menu_type": 3
    }
  ]
}
```
:::

::: details 点击查看 前端路由 配置数据
```js
export default {
  // 容器 路由配置
  Dictionary: {
    path: '/workbench/home',
    component: () => import(/* webpackChunkName: "demo" */ 'index.vue'),
  },

  FloorExist: {
    path: '/workbench/exist',
    component: () => import(/* webpackChunkName: "demo" */ 'exist.vue'),
  },
  FloorNew: {
    path: '/workbench/new',
    component: () => import(/* webpackChunkName: "demo" */ 'new.vue'),
  },
};
```
:::


::: details 点击查看 容器路由 组件内容
```vue
<!-- Dictionary.vue -->
<template>
  <al-container p="0">
    <!-- 路由标签页 -->
    <template #header>
      <al-router-panel :value="$route.name" :panels="basePanels" @panel-click="handleBasePanelClick" />
    </template>

    <!-- router-view 用于渲染子路由 -->
    <al-container type="router" />
  </al-container>
</template>

<script>
// 标签页数据混入，提供了一下内容
//     computed: basePanels (当前层级的路由所配置的路由标签数据)
//     methods: handleBasePanelClick (点击跳转路由的方法)
import baseTabs from '@/vue/mixins/base-tabs';

export default {
  name: 'ListIndex',
  mixins: [baseTabs],
};
</script>
```
:::


### 页面

点击后直接跳转到普通页面，则这个路由规则的 `menu_type` 为 `page(3)`，

例如：下图中 侧边栏中的 **楼盘列表**

::: details 点击查看 API 配置数据
```json
{
  "path": "home",
  "name": "Home",
  "title": "首页概览",
  "icon": "el-icon-house",
  "hidden": 0,
  "menu_type": 3
}
```
:::

::: details 点击查看 前端路由 配置数据
```js
export default {
  // 容器 路由配置
  Dictionary: {
    path: '/workbench/index',
    component: () => import(/* webpackChunkName: "demo" */ 'index.vue'),
  },

  FloorExist: {
    path: '/workbench/exist',
    component: () => import(/* webpackChunkName: "demo" */ 'exist.vue'),
  },
  FloorNew: {
    path: '/workbench/new',
    component: () => import(/* webpackChunkName: "demo" */ 'new.vue'),
  },
};
```
:::


## 路由间数据通信

很多情况下我们会遇到需要在两个页面中进行数据传递，例如：在新建页面提交后需要更新列表数据、在详情页编辑页修改信息后需要更新详情页数据。类似的需求可以通过 **事件的发布/订阅** 来实现。

在 `Vue` 中，我们可以轻松通过 `Vue` 本身的特性来实现：使用一个统一的 `Vue` 实例来进行事件的订阅和分发。

### 简单示例

在下面的示例中，简单的描述了如何监听事件，以及如何触发事件。

::: danger 警告
下面的代码只是一个简单的示例，用于解释实现的方式。请不要在项目中这么实现，使用事件的形式处理数据交互始终需要处理监听器的移除！
:::


```js
import Vue from 'vue';

const event = new Vue();

// A.vue, 用于显示数据
event.$on('update', data => {
  console.log('data is updated: ', data);
});

// B.vue, 数据编辑页面，提交后需要触发 A.vue 进行数据更新
function onSubmit () {
  event.$emit('update', 'B.vue');
}
```

### 事件定义规则

出于规范且便于后期维护，将所有的事件名称在 `@/vue/events/index.js` 中做统一声明管理。并需要按照以下规则进行命名：

1. 导出数据 统一使用 常量 进行声明
2. 变量名 使用 大驼峰方式 进行命名

**事件名称格式: `event.{type}.{module}[.{sub-module}].{name}`**

- `type` - 事件类型, 可选值: `route`=路由间数据传递, `component`=组件间数据传递
- `module` - 功能模块名, 例如: `user` => `event.route.user.modify`
- `sub-module?: string` - 功能子模块名, 例如: `house` => `event.route.house.sale.rename`
- `name: stirng` - 事件名称, 例如: `modify` => `event.route.user.modify`

示例：

```js
/**
 * 档案管理 - 基本信息编辑成功
 * @author whaoa
 */
export const EventArchivesInfoModify = 'event.route.archives.info.modify';
```


### 使用方式

**核心文件**

- `@/plugin/admin-layout.js`: 用于生成统一的 `Vue` 实例作为事件中心
- `@/vue/events/index.js`: 用于统一管理事件名称
- `@/vue/mixins/event.js`: 提供事件批量监听的混入方法 (`$onEvent`)

```typescript
// 枚举: 事件绑定类型，同 vm.($on | $once)
enum EmitType {
  on = 'on',
  once = 'once',
}
// 接口: 事件对象格式
interface CustomEvent {
  name: string;                  // 事件名
  type?: EmitType;               // 事件绑定类型
  handler(...arg: any[]): any,   // 事件回调
}
```

```js
// A.vue

// 用于处理组件的事件监听注册，并自动移除监听器
import { event } from '@/vue/mixins';
// 事件名称
import { EventArchivesInfoModify } from '@/vue/events';

export default {
  mixins: [event],

  created () {
    // 首次加载时初始化数据
    this.getInfo();

    // 监听事件，在组件被销毁时会自动移除监听器
    this.$onEvent([
      { name: EventArchivesInfoModify, handler: this.getInfo },
    ]);
  },

  methods: {
    // 获取数据
    fetch () {
      request.post(url, data);
    },
  }
};

// B.vue
// 事件名称
import { EventArchivesInfoModify } from '@/vue/events';

export default {
  mixins: [event],

  methods: {
    // 获取数据
    onSubmit () {
      request.post(url, data).then((result) => {
        // 触发事件，A.vue 中的事件将会执行
        this.$al.event.$emit(EventArchivesInfoModify, result);
      });
    },
  }
};
```

### 手动处理事件

事件触发方式同上，不在赘述。

```js
// 事件名称
import { EventArchivesInfoModify } from '@/vue/events';

export default {
  created () {
    this.$al.event.$on(EventArchivesInfoModify, this.callback);
  },

  methods: {
    callback () {
      console.log('event is emited!', data);
    },
  },

  // 手动处理时，必须移除事件监听器
  beforeDestroy () {    
    // 不传递参数，则会移除所有事件监听回调
    this.$al.event.$off();

    // 只传递第一个参数，则会移除这个事件名所对应的所有被注册过的事件回调
    this.$al.event.$off(EventArchivesInfoModify);

    // 传递事件名称，与事件回调方法，则会在事件监听器中移除这个回调函数，即下次触发事件时，该函数不再被执行
    this.$al.event.$off(EventArchivesInfoModify, this.callback);
  },
};
```

