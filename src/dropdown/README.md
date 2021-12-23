# Dropdown 下拉菜单

### 介绍

能拉但是只能拉一点点

### 引入

```js
import Vue from 'vue'
import { Dropdown } from 'obsession-ui'

Vue.use(Dropdown)
```

## 代码演示

#### 基础用法

<demo-code transform>./docs/Basic.vue</demo-code>

#### 自定义标题

<demo-code transform>./docs/CustomTitle.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue `v-model`   | 是否显示菜单       | _boolean_          | false     |
| popover     | Popover 组件的 Props，会改变父菜单及菜单的外层 Popover 容器   | _Partial\<PopoverProps\> & Record\<string, any\>_           | {}      |
| list   | 下拉菜单列表 | _DropdownRecord[]_ | []      |
| subMenuPlacement  | 子菜单弹出位置       | _PopoverPlacement_                                                           | 'right' |
| showArrow      | 是否显示指示箭头       | _boolean_                                                           | true   |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| default | 默认插槽 | - |
| title | 标题 | ...DropdownRecord |
| group | 分组 | ...DropdownRecord |

## 类型

### DropdownRecord

| 名称 | 说明 | 类型 | 是否可选 |
| --- | --- | --- | --- |
| index | 唯一标识符 | _string \| number \| symbol_ | 是 |
| title | 标题 | _string_ | 是 |
| icon | 图标 | _Component_ | 是 |
| disabled | 是否禁用 | _boolean_ | 是 |
| divided | 是否在菜单前插入分割线 | _boolean_ | 是 |
| groupName | 分组名称 | _string_ | 是 |
| click | 点击事件，返回 true 会阻止事件传递到父级 | _(record?: DropdownRecord) => void_ | 是 |
| children | 子菜单 | _DropdownRecord[]_ | 是 |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-dropdown-color | #666 | 字体颜色 |
| --o-dropdown-min-width | 100px | 最小宽度 |
|    --o-dropdown-font-size | 15px | 字体大小 |
|    --o-dropdown-group-font-size | 15px | 分组标题字体大小 |
|    --o-dropdown-padding-top-bottom | 8px | 单项上下内边距 |
|    --o-dropdown-padding-left-right | 15px | 单项左右内边距 |
|    --o-dropdown-icon-right | 5px | 图标右边距 |
|    --o-dropdown-arrow-size | 13px | 箭头大小 |
|    --o-dropdown-arrow-color | #333 | 箭头颜色 |
|    --o-dropdown-divided-color | #f5f5f5 | 分割线颜色 |
|    --o-dropdown-hover-background | #f5f5f5 | Hover 背景 |
|    --o-dropdown-popover-content-padding | 4px | 气泡弹出框内边距（上下） |