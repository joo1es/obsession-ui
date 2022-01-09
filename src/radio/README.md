# Radio 单选框

### 介绍

选择是一件困难的事情

### 引入

```js
import { createApp } from 'vue'
import { Radio, RadioGroup } from 'obsession-ui'

const app = createApp()
app.use(Radio)
app.use(RadioGroup)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 自定义尺寸

<demo-code transform>./demo/Size.vue</demo-code>

#### 使用单选框组

<demo-code transform>./demo/Group.vue</demo-code>

#### 定制单选框圆角

<demo-code transform>./demo/BorderRadius.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue `v-model`   | 可控模式值       | _boolean_          | -     |
| value     | 单选框值   | _string \| number \| symbol_           | -      |
| label | 单选框文本内容 | _string_ | - |
| disabled | 是否禁用 | _boolean_ | false |
| size | 单选框尺寸 | _'small' \| 'default' \| 'large'_ | 'default' |
| borderRadius | 单选框圆角大小 | _string_ | '2px' |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| update:modelValue      | 单选框值更改的回调       | _(value: boolean) => void_          | -     |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| default | 单选框标签插槽 | - |
| checked | 选中图标插槽 | - |
| unchecked | 未选中插槽 | - |

## Radio Group API

### 说明

Radio Group 组件可以使用所有 Space 组件的 Props

#### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue `v-model`   | 可控模式值       | _string \| number \| symbol_          | -     |
| disabled     | 是否禁用   | _boolean_           | -      |
| size | 单选框尺寸 | _'small' \| 'default' \| 'large'_ | 'default' |
| spaceSize | Space 组件的 Size | _string \| number \| [string \| number, string \| number]_ | - |

#### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| update:modelValue      | 单选框值更改的回调       | _(value: string \| number \| symbol) => void_          | -     |