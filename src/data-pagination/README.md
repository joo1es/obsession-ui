# Data Pagination 数据分页

### 介绍

解决大数据卡顿的最佳方案，适用于复杂场景

### 引入

```js
import { createApp } from 'vue'
import { DataPagination } from 'obsession-ui'

const app = createApp()
app.use(DataPagination)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 完整功能

<demo-code transform>./demo/Full.vue</demo-code>

#### 使用插槽替换 prev 和 next

<demo-code transform>./demo/PrevNext.vue</demo-code>

#### 自定义插槽

<demo-code transform>./demo/Custom.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| page `v-model`      | 页码       | _number_          | 1     |
| size `v-model`     | 每页尺寸   | _number_           | 10      |
| total   | 总数 | _number_ | 0      |
| layout  | 指定显示顺序，或者自定义插槽显示位置       | _('total' \| 'prev' \| 'pager' \| 'next' \| 'sizes' \| 'jumper' \| string)[]_   | ['total', 'prev', 'pager', 'next']  |
| pageCount      | 页数，如果不填则通过 total 和 size 计算       | _number_                                                           | -   |
| spaceProps | Space 组件的 Props       | _Partial\<SpaceProps> & Record\<string, any>_                                                    | -     |
| limit | 当前页码两边最多可显示的页码数量，同时也是使用双箭头按钮翻页的数量 | _number_ | 2 |
| sizes | 可选的尺寸 | _number[]_ | [10, 20, 30, 40] |
| sizesRender | 尺寸文本生成函数 | _(size: number) => string \| VNode_ | _(size: number) => \`${size}条/页`_ |
| disabled | 是否禁用 | _boolean_ | `false` |

### Expose

| 方法名 | 说明 | 类型 |
| -- | -- | -- |
| go | 安全地修改页码 | _(page: number \| string) => void_ |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| update:page      | 指定页码如何改变       | _(page: number) => void_          | -     |
| update:size      | 指定尺寸如何改变       | _(size: number) => void_          | -     |
| change      | 改变页码时的回调       | _(page: number) => void_          | -     |
| sizeChange      | 改变尺寸时的回调       | _(size: number) => void_          | -     |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| total | 总数 | _total: number_ |
| prev | 上一页 | _click: () => void, disabled: boolean_ |
| next | 下一页 | _click: () => void, disabled: boolean_ |
| jumpLeft | 双箭头跳转左 | _click: () => void, limit: number_ |
| jumpRight | 双箭头跳转右 | _click: () => void, limit: number_ |
| pager | 页码跳转按钮 | _click: () => void, page: number_ |
| sizes | 尺寸切换下拉 | _size: number, sizes: number[], render: (size: number) => string \| VNode_ |
| jumper | 页码跳转输入框 | - |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-data-pagination-font-size | 13px | 字体大小 |
| --o-data-pagination-button-height | 30px | 按钮高度 |
| --o-data-pagination-input-height | 30px | 输入框高度 |
| --o-data-pagination-active-color | var(--o-color-primary) | 激活颜色 |
