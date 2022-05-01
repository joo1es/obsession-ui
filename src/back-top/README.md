# BackTop 返回顶部

### 介绍

其实真正的返回顶部在你键盘的角落

### 引入

```js
import { createApp } from 'vue'
import { BackTop } from 'obsession-ui'

const app = createApp()
app.use(BackTop)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 平滑滚动 · 位置

<demo-code transform>./demo/Smooth.vue</demo-code>

#### 定制

<demo-code transform>./demo/Custom.vue</demo-code>

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| distance | 滚动距离为多少时显示回到顶部按钮                                                      | _number_ | 400      |
| smooth | 是否平滑滚动                                                        | _boolean_                                                   | -     |
| transitionName | 过渡 | _string_                                                   | 'o-back-top-transition'      |
| height | 占位高度 | _number \| string_                                                   | 80      |
| position | 位置 | _CSSProperties['justify-content']_                                                   | 'center'      |
| parent | 用于监听的父级元素，默认为最近的可滚动元素 | _Window \| HTMLElement \| SVGElement \| null_                                                   | -      |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽，用于替换按钮 |