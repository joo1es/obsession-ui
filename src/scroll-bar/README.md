# ScrollBar 滚动条

### 介绍

本来想用原生的，奈何浏览器的行为不统一

### 引入

```js
import { createApp } from 'vue'
import { ScrollBar } from 'obsession-ui'

const app = createApp()
app.use(ScrollBar)
```

## 代码演示

#### 基础用法

<demo-code transform>./Demo/Basic.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| xSize | 横轴滚动条宽度     | _number_                                                    | 6     |
| ySize | 纵轴滚动条宽度 | _number_ | 6 |
| xShow | 是否显示横轴滚动条     | _boolean_                                                    | true     |
| yShow | 是否显示纵轴滚动条 | _boolean_ | true |
| container | 监听的容器，如果不填写，则默认为子容器 | _Window \| HTMLElement \| SVGElement_ | - |
| smooth | 点击轨道时，是否平滑滚动 | _boolean_ | true |
| leaveSize | 非 hover 状态下的滚动条宽度/高度 | _number_ | 2 |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| scroll      | 滚动的监听事件       | _(e: Event) => void_          | -     |

### Expose

| 方法名 | 说明 | 类型 |
| -- | -- | -- |
| update | 主动更新元素 | _() => void_ |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |