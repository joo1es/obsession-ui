# Button 按钮

### 介绍

能点的

### 引入

```js
import { createApp } from 'vue'
import { Button, ButtonGroup } from 'obsession-ui'

const app = createApp()
app.use(Button)
app.use(ButtonGroup)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 禁用

<demo-code transform>./demo/Disabled.vue</demo-code>

#### 图标

<demo-code transform>./demo/Icon.vue</demo-code>

#### 尺寸

<demo-code transform>./demo/Size.vue</demo-code>

#### Loading

<demo-code transform>./demo/Loading.vue</demo-code>

#### 按钮组

<demo-code transform>./demo/ButtonGroup.vue</demo-code>

#### 自定义颜色

<demo-code transform>./demo/Color.vue</demo-code>

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| icon          | 图标                                                      | _string \| Component_ | -      |
| type         | 按钮类型                                                        | _ButtonTypes_                                                   | default     |
| size         | 按钮尺寸                                                        | _ButtonSize \| Record<string, string>_                                                   | default     |
| color | 按钮颜色 | _string_ | - |
| tag  | 渲染的标签                                               | _string \| Component_                                                   | button      |
| disabled   | 是否禁用     | _boolean_                                                   | false      |
| loading   | 是否加载中     | _boolean_                                                   | false      |
| round   | 是否使用大圆角     | _boolean_                                                   | false      |
| ghost   | 是否 Ghost     | _boolean_                                                   | false      |
| dashed | 是否虚线边框 | _boolean_ | false |
| block | 是否为块元素 | _boolean_ | false |
| iconPosition | 图标位置 | _'left' \| 'right'_ | left |
| buttonType | 原生 button 的 type | _string_ | - |
| hover | 是否需要 hover 效果，手机端关闭可以避免 hover 残留 | _boolean_ | true |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
| icon | 图标 |