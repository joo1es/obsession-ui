# PopDialog 气泡对话

### 介绍

讲道理，默认样式非常的QQ

### 引入

```js
import { createApp } from 'vue'
import { PopConfrim } from 'obsession-ui'

const app = createApp()
app.use(PopConfrim)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 自定义样式

<demo-code transform>./demo/Custom.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| content      | 内容       | _string_          | -     |
| avatar     | Avatar 组件的 Props   | _Partial<AvatarProps\> & Record\<string, any\>_           | {}      |
| showAvatar   | 是否显示头像 | _boolean_ | true      |
| arrow  | 是否显示箭头       | _boolean_                                                           | true  |
| right      | 头像是否在右侧       | _boolean_                                                           | -   |
| title | 标题文本，会显示在气泡的上方     | _string_                                                    | -     |
| showTitle | 是否显示标题文本 | _boolean_ | true |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| click      | 点击气泡框的回调       | _(e: Event) => void_          | -     |
| avatarClick      | 点击头像的回调       | _(e: Event) => void_          | -     |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | -- |
| default | 内容 | - |
| title | 标题替换内容 | - |
| avatar | 头像替换内容 | ...props.avatar |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-pop-dialog-font-size | _14px_ | 对话框字体大小 |
| --o-pop-dialog-padding | _10px_ | 对话框内边距 |
| --o-pop-dialog-border-radius | _10px_ | 对话框圆角 |
| --o-pop-dialog-margin | _10px_ | 对话框与头像的距离 |
| --o-pop-dialog-left-color | _#333_ | 左对话框字体颜色 |
| --o-pop-dialog-left-bg | _#fff_ | 左对话框背景 |
| --o-pop-dialog-left-active-bg | _#f5f5f5_ | 左对话框激活背景 |
| --o-pop-dialog-right-color | _#fff_ | 右对话框字体颜色 |
| --o-pop-dialog-left-bg | _#12b7f5_ | 右对话框背景 |
| --o-pop-dialog-left-active-bg | _#0d9dd3_ | 右对话框激活背景 |
| --o-pop-dialog-arrow-size | _8px_ | 箭头大小 |
| --o-pop-dialog-title-color | _#666_ | 标题颜色 |
| --o-pop-dialog-title-font-size | _13px_ | 标题字号 |