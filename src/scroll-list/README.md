# Scroll List 滚动列表

### 介绍

一切不过是障眼法

### Vue 版本要求

本组件的滚动动画依赖 `TransitionGroup` 对子元素的位移测量，因此对 Vue 版本有要求：

- **Vue `>= 3.5.23`**：推荐。位移测量不受祖先 `transform: scale()` 干扰，动画正确。
- **Vue `3.0.0 ~ 3.5.22`**：组件可正常使用。但若本组件的祖先元素带有 `transform: scale()`（如整体缩放的自适应布局、大屏适配、播放器横竖屏缩放等），列表滚动时元素会出现「跳一下」的现象。祖先容器没有缩放时不会有任何差异。
- **Vue `< 3.0.0`**：不支持。

如果你的项目暂时无法升级 Vue，请继续使用 `obsession-ui@1.1.15` 及更早版本 —— 这些版本内置了一份打过补丁的 `TransitionGroup`，在旧版 Vue 上动画同样正确。

补丁的上游来源是 [vuejs/core PR #6108](https://github.com/vuejs/core/pull/6108)（`fix(TransitionGroup): use offsetLeft and offsetTop instead of getBoundingClientRect to avoid transform scale affect animation`，2022-06-14 提交，2025-11-05 合入 `main`，随 **Vue 3.5.23** 发布）。既然修复已进入 Vue 本体，本组件已改为直接使用 Vue 内置的 `TransitionGroup`，不再自带副本。

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
