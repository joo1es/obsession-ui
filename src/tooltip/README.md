# Tooltip 文字提示

### 介绍

就类似于原生的 title，不过比它更快一些

### 引入

```js
import { createApp } from 'vue'
import { Tooltip } from 'obsession-ui'

const app = createApp()
app.use(Tooltip)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

## API

### Props

本组件可以使用任意 [Popover](./#/popover) 的 Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| title          | 文字提示内容                                                      | _string_ | -      |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
| title | 文字提示内容 |