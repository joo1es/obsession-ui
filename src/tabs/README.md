# Tabs 标签页

### 介绍

一个符合直觉的设计

### 引入

```js
import { createApp } from 'vue'
import { Tabs, Tab } from 'obsession-ui'

const app = createApp()
app.use(Tabs)
app.use(Tab)
```

## 代码演示

#### 基础用法

<demo-code transform>./Demo/Basic.vue</demo-code>
:::

#### 可关闭，卡片式

<demo-code transform>./Demo/Card.vue</demo-code>

#### 惰性渲染

<demo-code transform>./Demo/Lazy.vue</demo-code>

#### 仅输出标题

<demo-code transform>./Demo/Title.vue</demo-code>

## API

### Props

OTab 上组件的 attrs 会被集成到 标题对应的 dom 上

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue `v-model`      | 激活项       | _string \| symbol \| number \| boolean_          | -     |
| closable     | 是否可关闭   | _boolean_           | false      |
| spaceProps   | Space 组件的 Props | _Partial\<SpaceProps\> & Record\<string, any\>_ | -      |
| xScrollProps  | XScroll 组件的 Props       | _Partial\<XScrollProps\> & Record\<string, any\>_                                                           | -  |
| duration | 过渡动画持续时长 | _number_ | 300 |
| showLine | 是否显示下划线，仅非 card 模式下可用 | _boolean_ | true |
| lineWidth | 下划线的宽度，如果不设置，则与标题的宽度一致 | _number \| string_ | - |
| titleOnly | 是否仅显示标题 | _boolean_ | false |
| lazy | 是否惰性渲染（使用 v-if）| _boolean_ | false |
| card | 是否使用卡片模式 | _boolean_ | false |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| close      | tab 关闭的回调       | _(index: string \| symbol \| number \| boolean) => void_          | -     |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| default | 默认插槽 | - |
| prefix | 标题前置插槽 | - |
| suffix | 标题后置插槽 | - |
| close | 关闭按钮替换插槽 | - |

## Tab API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| title      | 标题       | _string_          | -     |
| index     | 唯一识别码，如果不设置，则为组件的索引   | _string \| symbol \| number \| boolean_           | -      |
| closeable   | 是否可关闭 | _boolean_ | -      |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| default | 默认插槽 | - |
| title | 标题替换插槽 | - |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-tabs-active-color | var(--o-color-primary) | 激活颜色 |
| --o-tabs-title-border | 1px solid #eee | 标题下边框 |
| --o-tabs-title-font-size | 14px | 标题字号大小 |
| --o-tabs-title-padding | 0 10px | 标题内边距 |
| --o-tabs-title-cell-padding | 10px 0 | 标题每项内边距 |
| --o-tabs-title-close-font-size | 12px | 标题关闭按钮字号 |
| --o-tabs-title-close-margin-left | 10px | 标题关闭按钮左边距 |
| --o-tabs-title-close-color | #666 | 标题关闭按钮颜色 |
| --o-tabs-line-height | 2px | 标题下划线高度 |
| --o-tabs-tab-padding | 10px | tab 页内边距 |
| --o-tabs-tab-padding | 14px | tab 页字号大小 |
| --o-tabs-card-title-background | #eee | 卡片模式下的标题背景 |
| --o-tabs-card-title-active-background | #fff | 卡片模式下的标题激活背景 |
| --o-tabs-card-title-padding | 0 | 卡片模式下的标题内边距 |
| --o-tabs-card-title-cell-padding | 10px 15px | 卡片模式下的标题每项内边距 |
| --o-tabs-card-title-font-size | 13px | 卡片模式下的标题字号 |
| --o-tabs-card-title-color | #333 | 卡片模式下的标题颜色 |