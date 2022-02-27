# ImagePreview 图片预览

### 介绍

这个组件有太多太多细节……

### 引入

```js
import { createApp } from 'vue'
import { ImagePreview } from 'obsession-ui'

const app = createApp()
app.use(ImagePreview)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| images | 需要预览的图片                                                      | _PreviewImage[]_ | []      |
| show `v-model` | 是否显示                                                        | _boolean_                                                   | -     |
| index `v-model` | 显示的图片索引 | _number_                                                   | -      |
| swipeDistance | 触发滑动手势的距离 | _number_                                                   | 150      |
| longPictureScale | 长图的比例，宽 / 高 | _number_                                                   | 2.5      |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
| cover | 覆盖层插槽 |
| tools | 右上角工具插槽 |

## 类型

### PreviewImage

| 名称    | 说明     | 类型 |
| ------- | -------- | ---- |
| src | 图片地址，必填 | _string_ |
| thumb | 图片缩略图 | _string_ |
| element | 图片元素，用于正确的找到过渡动画的中心位置 | _string \| Element_ |
| live | live 视频地址 | _string_ |
| points | 标记点位信息 | _{ position: [number, number], size?: [number, number], description?: string }[]_ |