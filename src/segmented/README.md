<script lang="ts" setup>
import { ShareAltOutlined } from '@vicons/antd'
</script>

## Segmented 分段控制器

### 介绍

产品喜欢在手机端用

### 引入

```js
import { createApp } from 'vue'
import { Segmented } from 'obsession-ui'

const app = createApp()
app.use(Segmented)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 尺寸

<demo-code transform>./demo/Size.vue</demo-code>

#### 禁用

<demo-code transform>./demo/Disabled.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| options   | 菜单项       | _(keyof any \| SegmentedOption)[]_          | 'auto'     |-
| modelValue `v-model`     | 双向绑定的值   | _keyof any_           | -      |
| block   | 是否按整行布局 | _boolean_ | false      |
| size  | 尺寸       | _'small' \| 'default' \| 'large_                                                           | 'default'  |
| disabled      | 是否整体禁用       | _boolean_                                                           | false   |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| change      | 菜单改变事件       | _(value: keyof any) => void_          | -     |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | -------- |
| item | item 替换插槽 | _SegmentedOption_ |
| label | label 替换插槽 | _SegmentedOption_ |

### SegmentedOption

| 名称    | 说明     | 类型 |
| ------- | -------- | -------- |
| label | 菜单显示的文字 | _string_ |
| value | 值 | _keyof any_ |
| className | 菜单绑定的 class | _string_ |
| icon | 菜单的图标 | _Component_ |
| disabled | 是否禁用 | _boolean_ |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-segmented-font-size | 14px | 字体大小 |
| --o-segmented-padding | 2px | 内边距 |
| --o-segmented-color | #000000a6 | 文字颜色 |
| --o-segmented-background | #0000000a | 背景颜色 |
| --o-segmented-transition | .3s | 过渡动画时长 |
| --o-segmented-border-radius | 4px | 圆角大小 |
| --o-segmented-hover-background | #00000011 | hover 时的背景 |
| --o-segmented-item-padding | 5px 18px | 菜单项的内边距 |
| --o-segmented-item-hover-color | #000000e6 | 菜单项 hover 时的文字颜色 |
| --o-segmented-item-active-color | #000000e6 | 菜单项激活时的文字颜色 |
| --o-segmented-thumb-shadow | 0 2px 8px -2px #0000000d, 0 1px 4px -1px #00000012, 0 0 1px #00000014 | 滑块阴影 |
| --o-segmented-thumb-background | #fff | 滑块背景颜色 |
