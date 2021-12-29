# Tag 标签

### 介绍

不要随便给人打上标签

### 引入

```js
import { createApp } from 'vue'
import { Tag } from 'obsession-ui'

const app = createApp()
app.use(Tag)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 自定义颜色

<demo-code transform>./demo/Color.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| label      | 标签内容       | _string_          | -     |
| icon     | 图标   | _Component_           | -      |
| closable   | 是否可关闭 | _boolean_ | -      |
| color  | 颜色数组，格式为 \[字体颜色, 背景色\]       | _\[string, string\]_                                                           | -  |
| size      | 尺寸       | _'small' \| 'default' \| 'medium' \| 'large'_                                                           | 'default'   |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| close      | 点击关闭后的回调       | _(e: Event) => void_          | -     |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
| icon | 图标插槽 |
| close-icon | 关闭图标插槽 |
