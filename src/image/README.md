# Image 图片

### 介绍

Img 是 inline 元素，却有着 inline-block 的表现

### 引入

```js
import { createApp } from 'vue'
import { Image } from 'obsession-ui'

const app = createApp()
app.use(Image)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 懒加载

<demo-code transform>./demo/Lazy.vue</demo-code>

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| size | 图片的尺寸                                                      | _number \| string \| [number \| string, number \| string]_ | -      |
| src | 图片地址                                                        | _src_                                                   | -     |
| contain | 图片适应容器的方式 | _'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'_                                                   | -      |
| borderRadius | 图片的圆角程度 | _string_                                                   | -      |
| background | 图片背景 | _string_                                                   | '#f5f5f5'      |
| color | 图标和文字的颜色 | _string_                                                   | -      |
| alt | 图片的 alt 属性 | _string_                                                   | -      |
| title | 标题，在默认情况下，错误或者无图像会显示 title 的第一个字符 | _string_ | - |
| lazy | 是否使用懒加载 | _boolean_ | false |
| lazyOptions | 懒加载选项 | _{ root?: MaybeElementRef, rootMargin?: string, threshold?: number \| number[] }_ | - |
| onlyIntersectingVisible | 是否仅在视口内可见 | _boolean_ | false |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| load | 图片加载成功的回调 | _(event: Event) => void_ | - |
| error | 图片加载出现错误的回调 | _() => void_ | - |
| abort | 图片取消加载的回调 | _(event: Event) => void_ | - |
| isIntersecting | 懒加载时图片更改可视状态的回调 | _(intersecting: boolean) => void_ | - |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽，可以任意替换图片 |
| loading | 加载中状态的插槽 |
| error | 加载错误的插槽 |
| empty | src 为空时的插槽 |