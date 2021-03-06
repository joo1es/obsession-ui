# Scroll List 滚动列表

### 介绍

一切不过是障眼法

### 引入

```js
import { createApp } from 'vue'
import { ScrollList } from 'obsession-ui'

const app = createApp()
app.use(ScrollList)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 反向（以最后一个元素为基准）

<demo-code transform>./demo/Reverse.vue</demo-code>

## API

### Props

所有的滚动，在元素 >= 2 且内部元素高度高于父级元素的情况下才有效。

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| height   | 容器高度       | _number \| string_          | 'auto'     |
| tag     | 容器渲染的标签   | _string_           | 'div'      |
| duration   | 滚动的间隔时长 `ms` | _number_ | 2000      |
| animationDuration  | 滚动的动画时长 `ms`       | _number_                                                           | 400  |
| hoverToStop      | 鼠标放置在上面时是否停止动画       | _boolean_                                                           | true   |
| space | 每行间距     | _number \| string_                                                    | 0     |
| play | 是否播放     | _boolean_                                                    | true     |
| base | 播放时以哪个元素为基准 | _'first' \| 'last'_ | 'first' |
| reverse | 反向播放     | _boolean_                                                    | true     |
| autoUpdate | 是否自动更新元素。设置为 `true` 时，元素发生任意变化就会重置元素位置。设置为 `false` 时，可主动调用 `update` 方法更新元素 | _boolean_ | true |
| count | 一次滚动的数量 | _number_ | 1 |
| linear | 是否使用线性动画 | _boolean_ | false |

### Expose

| 方法名 | 说明 | 类型 |
| -- | -- | -- |
| update | 主动更新元素 | _() => void_ |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
