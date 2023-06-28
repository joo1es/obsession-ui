# InfiniteScroll 无限滚动

### 介绍

每天不停地做着无限循环，然而幸福还在遥不可及的另一端。

### 引入

```js
import { createApp } from 'vue'
import { InfiniteScroll } from 'obsession-ui'

const app = createApp()
app.use(InfiniteScroll)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 自动滚动

<demo-code transform>./demo/AutoScroll.vue</demo-code>

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| auto | 是否自动滚动或自动滚动一像素的间隔（默认50ms）                                                      | _boolean \| number_ | -      |
| hover-to-stop | 鼠标悬停时静止                                                        | _boolean_                                                   | -     |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |