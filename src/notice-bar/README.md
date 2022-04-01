# NoticeBar 通知栏

### 介绍

一般用来放一些没人读的公告

### 引入

```js
import { createApp } from 'vue'
import { NoticeBar } from 'obsession-ui'

const app = createApp()
app.use(NoticeBar)
```

## 代码演示

#### 基础用法

<demo-code transform>./Demo/Basic.vue</demo-code>

#### 滚动和定制

<demo-code transform>./Demo/Scroll.vue</demo-code>

#### 结合 Scroll-List

<demo-code transform>./Demo/ScrollList.vue</demo-code>

#### 结合 Ellipsis

<demo-code transform>./Demo/Ellipsis.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| color      | 文字颜色       | _string_          | var(--o-color-warning)     |
| background     | 背景   | _string_           | #fffbe8      |
| text   | 文本 | _string_ | -      |
| icon  | 图标       | _Component_                                                           | -  |
| scrollable      | 是否滚动       | _boolean_                                                           | false   |
| duration | 一次滚动动画的时间 `ms`       | _number_                                                    | _40000_     |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽，文本 |
| icon | 图标替换插槽 |
| prefix | 前缀插槽 |
| suffix | 后缀插槽 |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-notice-bar-padding | 5px 10px | 内边距 |
| --o-notice-bar-font-size | 14px | 字号大小 |
| --o-notice-bar-gap | 5px | 间距 |