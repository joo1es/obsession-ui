# X-Scroll 横向滚动

### 介绍

别的组件竖着走，这个组件横着走

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

#### 配合菜单使用

<demo-code transform>./demo/Menu.vue</demo-code>

#### 配合 Space 组件 和 Tag 标签 使用

<demo-code transform>./demo/SpaceTag.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| showScrollbar | 是否显示原生滚动条       | _boolean_          | false     |
| disabled | 禁用横向滚动切换 | _boolean_           | false      |
| lockScrollIn | 触及边缘时是否阻止滚动事件 | _boolean_ | true |
| showButton | 是否显示左右滚动按钮 | _boolean_ | true |
| delta | 左右按钮点击滚动时的距离 | _number_ | 200 |
| onScroll | 滚动时的回调 | _(event: Event) => void_ | - |

### Expose

| 方法名 | 说明 | 类型 |
| -- | -- | -- |
| scrollTo | 滚动到指定位置（浏览器原生事件） | _(...args: any[]) => void_ |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | -- |
| default | 默认插槽 | - |
| leftArrow | 左箭头替换插槽 | _click: () => void_ |
| rightArrow | 右箭头替换插槽 | _click: () => void_ |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-x-scroll-arrow-width | 30px | 箭头按钮宽度 |
| --o-x-scroll-arrow-color | #333 | 箭头按钮颜色 |
| --o-x-scroll-arrow-color-hover | var(--primary-color) | 箭头按钮 Hover 颜色 |
| --o-x-scroll-arrow-left-bg | linear-gradient(to right, #fff, transparent) | 左箭头按钮背景颜色 |
| --o-x-scroll-arrow-right-bg | linear-gradient(to left, #fff, transparent) | 右箭头按钮背景颜色 |
| --o-x-scroll-duration | .2s | 过渡动画时长 |
