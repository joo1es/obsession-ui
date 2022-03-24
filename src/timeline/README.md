# Timeline 时间线

### 介绍

你的时间非常值钱 2

### 引入

```js
import { createApp } from 'vue'
import { Timeline, TimelineItem } from 'obsession-ui'

const app = createApp()
app.use(Timeline)
app.use(TimelineItem)
```

## 代码演示

#### 基础用法

<demo-code transform>./Demo/Basic.vue</demo-code>

#### 模式

<demo-code transform>./Demo/Mode.vue</demo-code>

## API

### Props

| 参数      | 说明                                          | 类型                                                                  | 默认值                |
| --------- |---------------------------------------------|---------------------------------------------------------------------|--------------------|
| reverse | 是否倒序       | _boolean_                                                      | _false_                  |
| relative | 是否使用相对模式                                       | _boolean_                                                           | _false_            |
| mode   | 显示模式                  | _'left' \| 'right' \| 'alternate'_                                                            | 'left'                  |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |

## Timeline Item API

### Props

| 参数      | 说明                                          | 类型                                                                  | 默认值                |
| --------- |---------------------------------------------|---------------------------------------------------------------------|--------------------|
| label | 时间标签内容       | _string_                                                      | -                  |
| dotColor | 圆点颜色                                       | _string_                                                           | -            |
| lineColor   | 连接线颜色                  | _string_                                                            | -                  |
| icon | 图标                                     | _Component_                                                           | -                  |
| loading  | 是否在加载中                                    | _boolean_                              | false                  |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
| label | 标签插槽 |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-timeline-font-size | 14px | 内容字号大小 |
| --o-timeline-gap | 25px | 间距 |
| --o-timeline-line-width | 35px | 线条容器宽度 |
| --o-timeline-label-width | 100px | 相对模式下的标签容器的宽度 |
| --o-timeline-label-color | rgb(134, 144, 156) | 标签的颜色 |
| --o-timeline-label-font-size | 12px | 标签的字号大小 |
| --o-timeline-item-dot-color | var(--o-color-primary) | 圆点颜色 |
| --o-timeline-item-dot-size | 6px | 圆点尺寸 |
| --o-timeline-item-dot-icon-size | 12px | 图标字体大小 |
| --o-timeline-item-line-color | rgb(229, 229, 234) | 连接线颜色 |
| --o-timeline-item-line-width | 2px | 连接线宽度 |
| --o-timeline-duration | .2s | 过渡动画时长 |