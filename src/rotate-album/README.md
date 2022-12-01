# RotateAlbum 旋转相册

### 介绍

花里胡哨了属于是

### 引入

```js
import { createApp } from 'vue'
import { RotateAlbum, RotateAlbum3d } from 'obsession-ui'

const app = createApp()
app.use(RotateAlbum, RotateAlbum3d)
```

## 代码演示

#### 基础用法

<demo-code transform>./Demo/Basic.vue</demo-code>

#### 3D 版

<demo-code transform>./Demo/3D.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| list   | 列表       | _any[]_          | -     |
| duration   | 旋转一圈的时间 (s) | _number_ | 20      |
| hoverToStop   | 鼠标悬停时停止动画 | _boolean_ | true      |
| showPath   | 是否展示路径 | _boolean_ | false      |
| pathColor | 路径颜色 | _string_ | 'red' |
| pathWidth | 路径线条宽度 | _number_ | 2 |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | ------- |
| default | 默认项插槽 | _{ item: any }_ |

## 3D API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| list   | 列表       | _any[]_          | -     |
| xDeg     | 俯视角度   | _string_           | `-5deg`      |
| size   | 尺寸 (px) | _number_ | 300      |
| duration   | 旋转一圈的时间 (s) | _number_ | 20      |
| hoverToStop   | 鼠标悬停时停止动画 | _boolean_ | true      |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | ------- |
| default | 默认项插槽 | _{ item: any }_ |