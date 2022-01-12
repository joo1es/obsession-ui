# Table 表格

### 介绍
基于原生的表格，暂时没有特别的功能。

### 引入

```js
import { createApp } from 'vue'
import { Table } from 'obsession-ui'

const app = createApp()
app.use(Table)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 斑马纹和纵向边框

<demo-code transform>./demo/Stripe.vue</demo-code>

#### 合并单元格

<demo-code transform>./demo/Cells.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| stripe      | 是否使用斑马纹       | _boolean_          | -     |
| border      | 是否有纵向边框       | _boolean_          | -     |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-table-font-size | 14px | 字体大小 |
| --o-table-border | 1px solid #eee | 表格边框 |
| --o-table-padding | 10px 15px | 表格项的内边距 |
| --o-table-stripe-background | #fcfcfc | 斑马纹表格背景 |
| --o-table-hover-background | #f8f8f8 | hover 时的表格背景 |