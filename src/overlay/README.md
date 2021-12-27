# Overlay 遮罩

### 介绍

遮挡视线用

### 引入

```js
import { createApp } from 'vue'
import { Overlay } from 'obsession-ui'

const app = createApp()
app.use(Overlay)
```

## 代码演示

### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

### 背景高斯模糊

<demo-code transform>./demo/Background.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue `v-model`      | 是否展示遮罩       | _boolean_          | -     |
| position     | Css position 属性   | _'fixed' \| 'absolute'_           | _'fixed'_      |
| background   | 背景 | _string_ | _'#00000099'_      |
| blur  | 背景高斯模糊，为字符串时代表背景高斯模糊程度       | _boolean \| string_                                                           | false  |
| zIndex      | Z 轴高度       | _number_                                                           | -   |
| to | Overlay 元素存放在哪个位置，设为 `false` 则为父元素       | _string \| RendererElement \| false_                                                    | -     |
| clickToClose | 是否可以通过点击关闭遮罩 | _boolean_ | true |
| useVShow | 是否使用 v-show，为否时使用 v-if | _boolean_ | false |
| transitionName | 过渡类名 | _string_ | _'O-overlay-fade'_ |
| preventScroll | 是否阻止 body 滚动 | _boolean_ | true |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| update:modelValue      | 改变是否展示遮罩       | _(value: boolean) => void_          | -     |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
