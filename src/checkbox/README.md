# Checkbox 复选框

### 介绍

小孩子才做选择，我全都要

### 引入

```js
import { createApp } from 'vue'
import { Checkbox, CheckboxGroup } from 'obsession-ui'

const app = createApp()
app.use(Checkbox)
app.use(CheckboxGroup)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 自定义尺寸

<demo-code transform>./demo/Size.vue</demo-code>

#### 插槽

<demo-code transform>./demo/Slot.vue</demo-code>

#### 使用复选框组

<demo-code transform>./demo/Group.vue</demo-code>

#### 定制复选框圆角

<demo-code transform>./demo/BorderRadius.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue `v-model`   | 可控模式值       | _boolean_          | -     |
| value     | 复选框值   | _string \| number \| symbol_           | -      |
| label | 复选框文本内容 | _string_ | - |
| disabled | 是否禁用 | _boolean_ | false |
| indeterminate | 是否部分选中 | _boolean_ | false |
| size | 复选框尺寸 | _'small' \| 'default' \| 'large'_ | 'default' |
| borderRadius | 复选框圆角大小 | _string_ | '2px' |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| update:modelValue      | 复选框值更改的回调       | _(value: boolean) => void_          | -     |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| default | 复选框标签插槽 | - |
| indeterminate | 部分选中图标插槽 | - |
| checked | 选中图标插槽 | - |
| unchecked | 未选中插槽 | - |

## Checkbox Group API

### 说明

Checkbox Group 组件可以使用所有 Space 组件的 Props

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue `v-model`   | 可控模式值       | _(string \| number \| symbol)[]_          | -     |
| disabled     | 是否禁用   | _boolean_           | -      |
| size | 复选框尺寸 | _'small' \| 'default' \| 'large'_ | 'default' |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| update:modelValue      | 复选框值更改的回调       | _(value: (string \| number \| symbol)[]) => void_          | -     |