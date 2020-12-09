---
title: ZhaofangA+ | v-action
publish: false
date: 2020-12-09
categories:
  - 帮助文档
tags:
  - ZhaofangA+
  - Help Docs
---

## 目录

[[toc]]

## 定义位置

- 文件目录:  `@/vue/directives/index.js`
- 表达式: `function action`


## 功能描述

该指令为全局注册指令，可通过 `v-action` 形式使用。用于通过权限信息动态控制页面内元素的显示状态。


## 相关内容

- [操作按钮类型列表](../button-type.md)


## 使用方法


### 页面级操作按钮

控制页面内 **表格上方的操作按钮**，如 **添加**，**批量删除** 等，通过 `指令 + 指令修饰符 [+ 绑定值(Boolean)]` 的方式使用。

> 修饰符列表详见：[操作按钮类型列表](../button-type.md)

``` html
<!-- 指令内部处理规则： -->

<!-- 判断当前页面的权限配置中是否包含该修饰符，如果不包含则在当前页面移除该元素 -->
<el-button v-action.page_add>创建新数据</el-button>

<!-- 可以配置多个指令修饰符，如果有一个不符合规则，就会被移除 -->
<el-button v-action.page_add.page_edit>多个指令修饰符</el-button>
```


### 列表级操作按钮

控制页面内 **表格操作列内按钮**，如 **删除**，**编辑** 等，通过 `指令 + 指令参数(list) + 指令修饰符 [+ 绑定值(Boolean)]` 的方式使用。

::: danger 警告
- 表格操作列内的 **需要权限控制的操作按钮** **必须** 使用 `al-fold-buttons` 组件进行包裹
- 指令后必须添加 `:list` 类型参数，指明以列表内权限的形式处理（指令参数必须在修饰符之前）
:::

``` html
<al-table>
  <vxe-table-column fixed="right" title="操作" width="100">
    <template v-slot="{ row }">
      <!-- 所有权限按钮都需要由该组件包裹，用于 更多按钮自动折叠 以及 权限处理 -->
      <al-fold-buttons>
        <!-- 列表内编辑权限 -->
        <vxe-button v-action:list.list_edit type="text" size="small" @click="edit(row)">编辑</vxe-button>
        <!-- 有绑定值的用法，只有 修饰符 + 绑定值(Boolean) 同时通过校验才会显示 -->
        <vxe-button v-action:list.list_remove="row.state" type="text" size="small" @click="remove(row)">删除</vxe-button>
      </al-fold-buttons>
    </template>
  </vxe-table-column>
</al-table>
```


### 列表级操作按钮

普通使用方式，通过 `指令 + 绑定值(Boolean)` 的方式使用，效果同 `v-if`

``` html
<el-button v-action="true">多个指令修饰符</el-button>
```
