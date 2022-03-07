# Cascader 级联

### 介绍

一般用来管理菜单权限

### 引入

```js
import { createApp } from 'vue'
import { Cascader } from 'obsession-ui'

const app = createApp()
app.use(Cascader)
```

## 代码演示

#### 基础用法

<demo-code transform>
./demo/Basic.vue
</demo-code>

#### 可单选

<demo-code transform>
./demo/Radio.vue
</demo-code>

#### 可多选，紧凑型，不可编辑

<demo-code transform>
./demo/Full.vue
</demo-code>

## API

### Props

| 参数      | 说明                                          | 类型                                                                  | 默认值                |
| --------- |---------------------------------------------|---------------------------------------------------------------------|--------------------|
| modelValue `v-model` | 双向绑定的值，会作为 useRadio 或者 useCheckbox 使用       | _string_                                                      | -                  |
| menus `v-model`   | 双向绑定的菜单                  | _height_                                                            | 300                  |
| props | 自定义使用哪个字段作为 key, title 和 children                                     | _{ key?: string; title?: string; children?: string; }_                                                           | _{ key: 'name', title: 'title', children: 'children' }_                  |
| dropdownList | 下拉菜单附加的列表 | _DropdownRecord[]_ | - |
| showModify | 是否显示下拉菜单中的编辑按钮 | _boolean_ | true |
| showDelete | 是否显示下拉菜单中的删除按钮 | _boolean_ | true |
| showAdd | 是否显示添加按钮 | _boolean_ | true |
| showDropdown | 是否显示下拉菜单 | _boolean_ | true |
| draggable | 是否可以拖拽排序 | _boolean_ | true |
| useRadio | 是否使用单选按钮 | _boolean_ | false |
| useCheckbox | 是否使用多选按钮 | _boolean_ | false |
| preset | 预设，可选值为 'compate' | _'compact' \| 'wide'_ | 'wide' |
| editable | 是否为可编辑，如果为否，则 showModify, showDelete, showDropdown, showAdd, draggable 参数无效 | _boolean_ | true |
| disabled | 是否禁用，如果为否，则 radio 和 checkbox 状态为不可编辑 | _boolean_ | false |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modify      | 编辑按钮的回调       | _(menuItem: CascaderMenu) => void_          | -     |
| delete      | 删除按钮的回调       | _(menuItem: CascaderMenu) => void_          | -     |
| add      | 添加按钮的回调       | _(menu: CascaderMenuDisplay) => void_          | -     |
| dragStart      | 拖动开始的事件回调       | _(menu: CascaderMenuDisplay) => void_          | -     |
| dragEnd      | 拖动结束的事件回调       | _(menu: CascaderMenuDisplay) => void_          | -     |
| dropdownClick | 自定义下拉菜单的事件 | _(record: DropdownRecord, menuItem: CascaderMenu) => void_ | - |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| title | 标题的替换插槽 | _CascaderMenu_ |
| add | 添加按钮的替换插槽 | _CascaderMenuDisplay_ |