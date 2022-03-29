# Result 结果

### 介绍

结果很重要

### 引入

```js
import { createApp } from 'vue'
import { Result } from 'obsession-ui'

const app = createApp()
app.use(Result)
```

## 代码演示

#### 基础用法

<demo-code transform>./Demo/Basic.vue</demo-code>

#### 修改图标

<demo-code transform>./Demo/Icon.vue</demo-code>

#### 使用插槽

<demo-code transform>./Demo/Slot.vue</demo-code>

#### 额外的插槽

<demo-code transform>./Demo/Suffix.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| icon   | 图标       | _string_          | ✋     |
| message     | 消息   | _string_           | -      |
| description   | 描述 | _string_ | -      |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| icon | 图标插槽 |
| message | 消息插槽 |
| description | 描述插槽 |
| suffix | 后置插槽 |