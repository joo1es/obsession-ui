# Pagination 分页

### 介绍

如果用不了虚拟列表，那你可能就用到他了

### 引入

```js
import { createApp } from 'vue'
import { Pagination } from 'obsession-ui'

const app = createApp()
app.use(Pagination)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 尺寸

<demo-code transform>./demo/Size.vue</demo-code>

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| page `v-model`         | 页码                                                        | _number_                                                   | -     |
| total          | 页面总数                                                      | _number_ | 1      |
| size  | 尺寸                                               | _'small' \| 'default' \| 'mini' \| 'large'_                                                   | 'default'      |
| sizeMap | 尺寸文本映射函数 | _(page: number) => string_ | - |

### Methods

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| update:page         | 页码修改                                                        | _(page: number) => void_                                                   | -     |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | -------- |
| page | 页码显示插槽 | _page: number, total: number_ |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-pagination-hover-background-color | #f5f5f5 | 按钮 Hover 背景颜色 |
| --o-pagination-height | 34px | 按钮高度 |
| --o-pagination-min-width | 120px | 按钮 / 输入框最小宽度 |
| --o-pagination-font-size | 14px | 字号大小 |
| --o-pagination-popover-max-height | 200px | Popover 弹出框的最大高度 |
| --o-pagination-active-color | var(--primary-color) | 激活颜色 |
| --o-pagination-danger-color | var(--danger-color) | 输入框输入错误颜色 |
| --o-pagination-input-color | #333 | 输入框字体颜色 |