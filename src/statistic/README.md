# 统计数据 Statistic

### 介绍
UI 画的设计稿里喜欢用一大一小标注数据和单位，切图的时候总是让人很苦恼。

### 引入

```js
import { createApp } from 'vue'
import { Statistic } from 'obsession-ui'

const app = createApp()
app.use(Statistic)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 垂直模式

<demo-code transform>./demo/Vertical.vue</demo-code>

#### 做任何你想做的

<demo-code transform>./demo/DoAnyThing.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| label      | 标签       | _string \| number_          | -     |
| value      | 数值       | _string \| number_          | -     |
| prefix      | 数值前缀       | _string \| number_          | -     |
| suffix      | 数值后缀       | _string \| number_          | -     |
| labelStyle | 标签样式 | _CSSProperties \| string_ | - |
| valueStyle | 数值样式 | _CSSProperties \| string_ | - |
| prefixStyle | 前缀样式 | _CSSProperties \| string_ | - |
| suffixStyle | 后缀样式 | _CSSProperties \| string_ | - |
| align     | 主轴对齐方式   | _'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'_           | -      |
| justify   | 交叉轴对齐方式 | _'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between'_ | -      |
| vertical  | 是否垂直       | _boolean_                                                           | false  |
| reverse      | 是否反向       | _boolean_                                                           | false   |

### Slots

插槽的使用优先级会大于 Props

| 名称    | 说明     |
| ------- | -------- |
| default | 数值 |
| value | 数值（优先级低于 default） |
| prefix | 数值前缀 |
| suffix | 数值后缀 |
| label | 标签 |
| top | 前置插槽 |
| bottom | 后置插槽 |