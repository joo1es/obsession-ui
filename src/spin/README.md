## Spin 加载中

### 介绍

方便在后台做一些事情

### 引入

```js
import { createApp } from 'vue'
import { Spin } from 'obsession-ui'

const app = createApp()
app.use(Spin)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 嵌套使用

<demo-code transform>./demo/In.vue</demo-code>

#### 全屏

<demo-code transform>./demo/FullScreen.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| size      | 加载图标尺寸       | _number \| string_          | -     |
| color     | 加载图标颜色   | _string_           | -      |
| vertical   | 是否纵向排列文字 | _boolean_ | false      |
| textSize      | 文本尺寸       | _number \| string_          | -     |
| textColor     | 文本颜色   | _string_           | -      |
| text   | 文本内容 | _string_ | -      |
| loading  | 是否加载中，仅默认插槽中存在内容使用       | _boolean_                                                           | true  |
| fullscreen | 是否全屏 | _boolean_ | true |
| background | 自定义背景 | _stirng_ | - |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽，如果存在，则为嵌套使用 |
| text | 文本替换插槽 |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-spin-spinner-size | 1em | 加载图标大小 |
| --o-spin-spinner-color | var(--primary-color) | 加载图标颜色 |
| --o-spin-text-font-size | 14px | 文本字体大小 |
| --o-spin-text-color | var(--primary-color) | 文本颜色 |
| --o-spin-spinner-animation-duration | 3s | 动画持续时长 |
| --o-spin-background | rgba(255, 255, 255, .6) | 背景 |