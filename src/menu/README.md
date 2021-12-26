# Menu 菜单

### 介绍

服务员，这桌来一份菜单

### 引入

```js
import { createApp } from 'vue'
import { Menu } from 'obsession-ui'

const app = createApp()
app.use(Menu)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 纵向

<demo-code transform>./demo/Vertical.vue</demo-code>

#### 折叠

<demo-code transform>./demo/Collapse.vue</demo-code>

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| modelValue `v-model`         | 激活项                                                        | _string \| number \| symbol_                                                   | -     |
| unfold `v-model:unfold`   | 展开项     | _(string \| number \| symbol)[]_                                                   | -      |
| vertical          | 是否纵向                                                      | _boolean_ | false      |
| list  | 渲染的菜单列表                                               | _MenuList_                                                   | []      |
| collapse   | 是否折叠     | _boolean_                                                   | false      |
| trigger   | Popover 呼出方式     | _'hover' \| 'click'_                                                   | 'click'      |
| showArrow | 是否显示指示箭头 | _boolean_ | true |
| width | 宽度（仅在纵向模式且非折叠的情况下有效） | _string_ | '400px' |
| click   | 点击任意项的事件回调，返回 _true_ 会阻止默认对激活项的修改     | _(value?: MenuRecord) => boolean \| void_                                                   | -      |

### Methods

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| update:modelValue         | 激活项                                                        | _(value: string \| number \| symbol) => void_                                                   | -     |
| update:unfold  | 展开项                                               | _(value: (string \| number \| symbol)[]) => void_                                                   | -      |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | -------- |
| title | 标题 | { ...MenuRecord } |

## 类型

### MenuRecord

| 名称 | 说明 | 类型 | 是否可选 |
| --- | --- | --- | --- |
| index | 唯一标识符 | _string \| number \| symbol_ | 否 |
| title | 标题 | _string_ | 是 |
| icon | 图标 | _Component_ | 是 |
| disabled | 是否禁用 | _boolean_ | 是 |
| info | 任何你想携带的信息 | _Record<string, any>_ | 是 |
| groupName | 分组名称 | _string_ | 是 |
| children | 子菜单 | _MenuList_ | 是 |

### MenuList

_MenuRecord[]_

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-menu-color | #333 | 字体颜色 |
| --o-menu-max-width | 800px | 纵向菜单最大宽度 |
|    --o-menu-font-size | 15px | 字体大小 |
|    --o-menu-group-font-size | 14px | 分组标题字体大小 |
|    --o-menu-padding-top-bottom | 15px | 单项上下内边距 |
|    --o-menu-padding-left-right | 15px | 单项左右内边距 |
|    --o-menu-indent | 20px | 单次缩进 |
|    --o-menu-item-min-width | 200px | 菜单最小宽度 |
|    --o-menu-active-color | #2080f0 | 激活颜色 |
|    --o-menu-arrow-color | #909399 | 箭头颜色 |
|    --o-menu-hover-color | #eeeeee60 | Hover 背景 |