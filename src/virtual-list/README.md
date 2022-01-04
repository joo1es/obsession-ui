# Virtual List 虚拟列表

### 介绍

本组件引用自 [vueuc](https://github.com/07akioni/vueuc) 库

### 全局引入

```js
import { createApp } from 'vue'
import { VirtualList } from 'obsession-ui'

const app = createApp()
app.use(VirtualList)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 自适应高度

<demo-code transform>./demo/AutoHeight.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| showScrollbar | 是否显示滚动条       | _boolean_          | true     |
| items | 列表项目 | _ItemData[]_           | -      |
| itemSize   | 项目高度，如果是动态高度，则为最小高度 | _number_ | {}      |
| itemResizable | 项目是否为动态高度       | _boolean_                                                           | false  |
| itemsStyle  | 项目样式     | _string \| CSSProperties_                                                           | false   |
| visibleItemsTag | 可见项目标签或组件 | _string \| object_ | 'div' |
| visibleItemsProps | 可见项目的 props | _object_ | - |
| ignoreItemResize | 忽略项目的尺寸更新 | _boolean_ | false |
| defaultScrollKey| 默认滚动到的位置（key） | _number \| string_ | - |
| defaultScrollIndex | 默认滚动到的位置（index） | _number_ | - |
| keyField | key 的字段 | _string_ | 'key' |
| paddingTop | 上内边距 | _number \| string_ | 0 |
| paddingBottom | 下内边距 | _number \| string_ | 0 |
| onScroll | 滚动时的回调 | _(event: Event) => void_ | - |
| onWheel | 使用滚轮滚动时的回调 | _(event: WheelEvent) => void_ | - |
| onResize | 调整 Element 宽高时的回调 | _(entry: ResizeObserverEntry) => void_ | - |


### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| default | 默认插槽 | _item: unknown, index: number_ |

### Expose

| 方法名 | 说明 | 类型 |
| -- | -- | -- |
| scrollTo | 滚动到指定位置 | _(options: VScrollToOptions) => void_ |