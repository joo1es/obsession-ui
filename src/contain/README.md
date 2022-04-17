# Contain 容纳

### 介绍

你可以认为他是任意组件的 object-fit: contain

### 引入

```js
import { createApp } from 'vue'
import { Contain } from 'obsession-ui'

const app = createApp()
app.use(Contain)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 调试模式

<demo-code transform>./demo/Dev.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| width | 标准宽度，用于完成最终的比例换算       | _number_          | 1920     |
| height      | 标准高度，用于完成最终的比例换算       | _number_          | 1080     |
| background | 背景 | _string_ | - |
| blur | 是否采用高斯模糊背景，只有在 background 属性值存在且有效时才有效 | _boolean_ | false |
| dev | 是否使用调试模式，会为所有使用了 getStyle 属性的元素添加红色边框 | _boolean_ | false |
| backgroundToFullscreen | 是否运行双击背景切换全屏 | _boolean_ | false |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | ----- |
| default | 默认插槽 | _getStyle: (style: CSSProperties & Partial\<ContainStyle\>, width?: number, height?: number, dev?: boolean) =\> CSSProperties_ |

### Expose

| 参数      | 说明           | 类型                                                                |
| --------- | -------------- | ------------------------------------------------------------------- |
| getStyle | 等同于默认插槽中的 getStyle 方法       | _(style: CSSProperties & Partial\<ContainStyle\>, width?: number, height?: number, dev?: boolean) =\> CSSProperties_          |
| toggleFullscreen      | 切换全屏状态       | _() => void_          |

## Interface

### ContainStyle

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| fixed | 是否使用 position: fixed，默认使用 absolute，使用 fixed 可以尽可能的保证元素是相对于 Contain 容器而非父级的相对/绝对元素       | _boolean_          | false     |
| width | 宽度       | _number_          | -     |
| height | 高度 | _number_ | - |
| top | CSS 中的 top 属性 | _number_ | - |
| bottom | CSS 中的 bottom 属性 | _number_ | - |
| left | CSS 中的 left 属性 | _number_ | - |
| right | CSS 中的 right 属性 | _number_ | - |

## Provide

### useGetStyle

在 Contain 组件的所有子组件中，都可以在 setup 中通过调用 useGetStyle 来获取 getStyle 方法，原理是 provide 和 inject。若调用时没有发现父级，则 width 或使用默认值 1920，height 使用默认值 1080，dev 使用默认值 false。

```js
import { useGetStyle } from 'obsession-ui'

const getStyle = useGetStyle()
getStyle({ width: 200, height: 200 }) // { width: 10.4167%; height: 18.5185%; }
```