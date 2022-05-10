# AspectRadio 纵横比

### 介绍

aspect-ratio 为容器规定了一个期待的纵横比，这个纵横比可以用来计算自动尺寸以及为其他布局函数服务。

### 引入

```js
import { createApp } from 'vue'
import { AspectRadio } from 'obsession-ui'

const app = createApp()
app.use(AspectRadio)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 调整比例

<demo-code transform>./demo/Ratio.vue</demo-code>

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| ratio | 纵横比，通常为宽度除以高度                                                      | _number_ | 1      |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |