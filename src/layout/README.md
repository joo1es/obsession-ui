# Layout 布局

### 介绍

一个项目很有可能只会有一次组织布局的机会

### 引入

```js
import { createApp } from 'vue'
import { Layout, LayoutContent, LayoutAside } from 'obsession-ui'

const app = createApp()
app.use(Layout)
app.use(LayoutContent)
app.use(LayoutAside)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 任意组合布局

<demo-code transform>./demo/Free.vue</demo-code>

#### 三栏式布局

<demo-code transform>./demo/Columns.vue</demo-code>

## Layout API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| row      | 是否行布局       | _boolean_          | false     |

## LayoutAside API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| width      | 宽度       | _string \| number_          | -     |
| height      | 高度       | _string \| number_          | -     |
| padding | 内边距 | _string_ | - |

## LayoutContnet API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| padding | 内边距 | _string_ | - |