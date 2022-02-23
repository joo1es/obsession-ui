# Input 输入框

### 介绍

请输入一些东西……

### 引入

```js
import { createApp } from 'vue'
import { Input } from 'obsession-ui'

const app = createApp()
app.use(Input)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 密码

<demo-code transform>./demo/Password.vue</demo-code>

#### 尺寸

<demo-code transform>./demo/Size.vue</demo-code>

#### 文本域

<demo-code transform>./demo/Textarea.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue `v-model`      | 绑定的文本变量       | _string_          | -     |
| clearable     | 是否显示清空按钮   | _boolean_           | -      |
| type   | 文本框的类型，可选值为 textarea 和所有 input 标签支持的 type | _string_ | -      |
| placeholder  | 未输入时显示的文本       | _string_                                                           | '请输入'  |
| disabled  | 是否禁用       | _boolean_                                                           | false   |
| readonly | 是否是只读 | _boolean_ | false |
| prefix | 前缀图标 | _Component_ | - |
| suffix | 后缀图标 | _Component_ | - |
| maxlength | 最多输入的字符数 | _number_ | - |
| showWordSize | 是否显示字符统计 | _boolean_ | false |
| size | 尺寸 | _'small' \| 'default' \| 'medium' \| 'large'_ | 'default' |
| autofocus | 自动聚焦，原生属性 | _boolean_ | - |
| tabindex | 原生 tabindex 属性 | _string \| number_ | - |
| name | 原生 name 属性 | _string_ | - |
| resize | 可调整的维度 | _'none' \| 'both' \| 'horizontal' \| 'vertical'_ | - |
| rows | 文本域的默认高度，行 | _number_ | - |
| showPasswordIcon | 是否显示密码切换按钮 | _boolean_ | true |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| prefix | 前缀替换插槽 | - |
| suffix | 后缀替换插槽 | - |
| close-icon | 关闭图标插槽 | - |