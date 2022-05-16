# Table 表格

### 介绍
似乎是后台系统的重中之重

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

#### 多级表头 和 文本省略

<demo-code transform>./demo/Ellipsis.vue</demo-code>

#### 带斑马纹和边框的表格

<demo-code transform>./demo/Stripe.vue</demo-code>

#### 固定头、合计行、层级

<demo-code transform>./demo/Fixed.vue</demo-code>

#### 大数据

<demo-code transform>./demo/BigData.vue</demo-code>

#### 黑暗模式、固定列

<demo-code transform>./demo/Dark.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| selections `v-model:selections`      | 选中项       | _any[]_          | -    |
| radio `v-model:radio` | 单选中项 | _any_ | - |
| expands `v-model:expands`      | 展开项       | _any[]_          | -    |
| dark | 是否启用黑暗模式 | _boolean_ | false |
| columns | 列 | _[TableColumn](#tablecolumn)[]_ | - |
| data | 表格数据 | _any[]_ | - |
| rowKey | 行id | _string_ | - |
| border | 是否显示纵向线条 | _string_ | - |
| stripe | 是否启用斑马纹 | _boolean_ | - |
| itemHeight | 项目的高度，用于配合虚拟列表 | _number_ | 50 |
| height | 表格的最大高度，可以配合 fixed | _number \| string_ | - |
| totalLine | 合计行 | _object_ | - |
| fixed | 是否固定表头和合计行 | _boolean_ | false |
| scrollWidth | 滚动宽度，可以配合列的 fixed | _number \| string_ | - |
| childrenField | children 字段 | _string_ | - |
| rowClassName | 行的 Class | _string \| ((rowData: object, index: number) => string)_ | - |
| cellClassName | 项的 Class | _string \| ((rowData: object, index: number, column: [TableColumn](#/table#tablecolumn)[]) => string)_ | - |
| virtual | 是否使用虚拟列表渲染 | _boolean_ | false |
| hideHead | 是否隐藏表头 | _boolean_ | false |
| shadow | 是否为 fixed 的列显示阴影，如果 fixed 列不在两边，建议关闭阴影 | _boolean_ | true |
| scrollBar | 滚动条组件的 props | _Partial\<ScrollBarProps\> & Record\<string, any\>_ | - |
| sort `v-model:sort` | 排序 | _Map\<keyof any, 'desc' \| 'asc' \| undefined>_ | - |
| sortMode | 排序模式 | _'single' \| 'multiple'_ | single |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| rowClick      | 行点击事件       | _(rowData: object, index: number) => void_          | -     |
| cellClick      | 项的点击事件       | _(rowData: object, index: number, column: [TableColumn](#/table#tablecolumn)[]) => void_          | -     |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | ----- |
| table-[prop] | 表格替换插槽 | _column: [TableColumn](#/table#tablecolumn), row: object, index: number_ |
| head-[prop] | 头部替换插槽 | _column: [TableColumn](#/table#tablecolumn)_ |
| foot-[prop] | 合计行替换插槽 | _column: [TableColumn](#/table#tablecolumn)_ |
| empty | 数据为空的替换插槽 | - |
| sort | 主动触发的 sort 事件 | _(prop: keyof any, way: 'desc' \| 'asc' \| undefined, allSort: Map\<keyof any, 'desc' \| 'asc' \| undefined>) => void_ | - |

## 类型

### TableColumn

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| label      | 列的显示名称       | _string_          | -    |
| prop      | 列的 key       | _keyof any_          | -    |
| ellipsis | 是否配置字符省略 | _boolean \| EllipsisProps_ | false |
| width | 宽度 | _string \| number_ | - |
| minWidth | 最小宽度 | _string \| number_ | - |
| fixed | 是否固定 | _boolean \| 'left' \| 'right'_ | - |
| align | 对齐方式 | _'left' \| 'right' \| 'center'_ | - |
| children | 子列 | _[TableColumn](#/table#tablecolumn)[]_ | - |
| type | 类型 | _'index' \| 'selection' \| 'chekcbox' \| 'radio'_ | - |
| indent | 是否用作缩进列 | _boolean_ | - |
| colSpan | 跨列 | _(rowData: object, rowIndex: number) => number_ | - |
| rowSpan | 跨行 | _(rowData: object, rowIndex: number) => number_ | - |
| className | 列的类名 | _string_ | - |
| sortable | 是否可排序 | _boolean \| ((a: unknown, b: unknown) => number) \| 'remote'_ | - |