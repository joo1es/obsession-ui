# Omit 省略

### 介绍

有一些东西可能不需要被你看到，但我得告诉你这里缺了一点东西

### 引入

```js
import { createApp } from 'vue'
import { Omit, OmitItem } from 'obsession-ui'

const app = createApp()
app.use(Omit)
app.use(OmitItem)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 切换模式

<demo-code transform>./demo/Switch.vue</demo-code>

## API

### Props

Omit 组件可以使用所有 Space 组件的Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| disabled      | 是否禁用省略       | _boolean_          | -     |
| ellipsis     | 是否显示省略图标   | _boolean_           | true      |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
| ellipsis | 省略图标插槽 |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| ellipsisClick     | 省略图标的点击事件   | _(e: Event) => void_           | -      |

## Omit Item API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| omit      | 是否省略       | _boolean_          | -     |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-omit-ellipsis-color | #ccc | 省略图标颜色 |
| --o-omit-ellipsis-font-size | 24px | 省略图标字体大小 |