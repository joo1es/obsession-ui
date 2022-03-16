# Carousel 轮播图

### 介绍

前端入门测试组件

### 引入

```js
import { createApp } from 'vue'
import { Carousel } from 'obsession-ui'

const app = createApp()
app.use(Carousel)
```

## 代码演示

#### 基础用法

<demo-code transform>./Demo/Basic.vue</demo-code>

#### 纵向

<demo-code transform>./Demo/Vertical.vue</demo-code>

## API

### Props

| 参数           | 说明       | 类型                                                                      | 默认值   |
|--------------|----------|-------------------------------------------------------------------------|-------|
| modelValue `v-model`      | 双向绑定的激活项     | _number_ | 0 |
| vertical      | 是否启用纵向模式 | _boolean_                                                               | false |
| autoPlay      | 是否启用自动播放 | _boolean_                                                               | false |
| duration      | 自动播放间隔时长 | _number_                                                               | 3000 |
| indicator | 指示器选项 | _'inside' \| 'none'_ | inside |
| trigger      | 指示器触发方式 | _'click' \| 'hover'_                                                               | hover |
| arrow | 箭头显示方式，仅横向模式下有效 | _'none' \| 'always' \| 'hover'_ | hover |
| hoverToStop | 鼠标 hover 时停止自动播放 | _boolean_ | true |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| default | 默认插槽 | - |
| indicators | 指示器替换插槽 | _index: number, length: number, switch: (index: number) => void_ |
| cover | 覆盖插槽 | - |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-carousel-transition-duration | .3s | 过渡动画时长 |
| --o-carousel-height | 300px | 高度 |
| --o-carousel-cell-background | #ddd | 背景 |
| --o-carousel-indicators-margin | 10px | 指示器外边距 |
| --o-carousel-indicator-size | 6px | 指示器尺寸 |
| --o-carousel-indicator-active-size | 30px | 指示器激活尺寸 |
| --o-carousel-indicator-margin | 3px | 指示器外边距 |
| --o-carousel-indicator-background | rgba(255, 255, 255, .6) | 指示器背景 |
| --o-carousel-indicator-active-background | #fff | 指示器激活背景 |
| --o-carousel-arrow-size | 40px | 箭头尺寸 |
| --o-carousel-arrow-font-size | 12px | 箭头图标尺寸 |
| --o-carousel-arrow-margin | 15px | 箭头边距 |
| --o-carousel-arrow-color | #fff | 箭头颜色 |
| --o-carousel-arrow-background | rgba(0, 0, 0, .1) | 箭头背景颜色 |
| --o-carousel-arrow-active-background | rgba(0, 0, 0, .2) | 箭头激活的背景颜色 |