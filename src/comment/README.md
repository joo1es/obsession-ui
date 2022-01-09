# Comment 评论

### 介绍

一种用于互动的媒介

### 引入

```js
import { createApp } from 'vue'
import { Comment } from 'obsession-ui'

const app = createApp()
app.use(Comment)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 连接线

<demo-code transform>./demo/Line.vue</demo-code>

#### 定制

<demo-code transform>./demo/Custom.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| indent      | 缩进数，默认会按照层级生成       | _number_          | -     |
| indentSize      | 每一层级的缩进距离       | _number_          | -     |
| avatar | 头像，设置为 false 则不显示头像 | _false \| Partial\<AvatarProps\> & Record\<string, any\>_ | - |
| author | 作者 | _string_ | - |
| content | 内容 | _string_ | - |
| leftLine | 左连接线 | _boolean_ | false |
| topLine | 上连接线 | _boolean_ | false |
| bottomLine | 下连接线 | _boolean_ | false |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| click      | 评论点击事件       | _(e: Event): void_          | -     |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认内容插槽 |
| avatar | 头像插槽 |
| author | 作者插槽 |
| actions | 动作插槽 |
| comment | 嵌套评论插槽 |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-comment-padding | 10px | 内边距 |
| --o-comment-color | #252525 | 内容文本颜色 |
| --o-comment-author-color | #657785 | 作者文本颜色 |
| --o-comment-actions-color | #657785 | 动作文本颜色 |
| --o-comment-font-size | 14px | 内容字号大小 |
| --o-comment-author-font-size | 13px | 作者字号大小 |
| --o-comment-actions-font-size | 12px | 动作字号大小 |
| --o-comment-line-height | 22px | 内容行高 |
| --o-comment-bottom-border | 1px solid #f5f5f5 | 下边框样式 |
| --o-comment-line-size | 1px | 连接线尺寸 |
| --o-comment-line-color | #d3ddde | 连接线颜色 |
| --o-comment-line-border-radius | 2px | 连接线圆角尺寸 |
| --o-comment-active-bg | #f4f5f6 | 激活状态下的背景 |