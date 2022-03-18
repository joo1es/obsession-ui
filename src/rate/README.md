# Rate 评分

### 介绍

不要随便给人打分

### 引入

```js
import { createApp } from 'vue'
import { Rate } from 'obsession-ui'

const app = createApp()
app.use(Rate)
```

## 代码演示

#### 基础用法

<demo-code transform>./Demo/Basic.vue</demo-code>

#### 显示文字

<demo-code transform>./Demo/ShowText.vue</demo-code>

#### 只读

<demo-code transform>./Demo/Readonly.vue</demo-code>

#### 定制样式和颜色

<demo-code transform>./Demo/Custom.vue</demo-code>

## API

### Props

| 参数      | 说明 | 类型                             | 默认值        |
|---------|--|--------------------------------|------------|
| modelValue `v-model` | 绑定值 | _number_           | -         |
| max | 最大值 | _number_           | 5         |
| showText | 是否显示描述文本 | _boolean_           | false         |
| readonly | 是否只读 | _boolean_           | false         |
| activeIcon | 激活图标 | _Component_ | - |
| inactiveIcon | 未激活图标 | _Component_ | - |

### Emits

| 参数  | 说明 | 参数                  |
|-----|--|---------------------|
|  change  | 修改值时的回调 | _value: number_        |

### Slots

| 参数  | 说明 | 参数                  |
|-----|--|---------------------|
|  rate  | 评分替换插槽 | _rate: number, active: boolean, valueActive: boolean, hover: boolean_        |
|  text  | 文本替换插槽 | _rate: number, active: number_ |

### 定制

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-rate-color | #cdd0d6 | 评分默认颜色 |
| --o-rate-active-color | rgb(243, 181, 51) | 评分激活颜色 |
| --o-rate-size | 18px | 评分图标尺寸 |
| --o-rate-gap | 5px | 间距 |
| --o-rate-text-size | 14px | 文本尺寸 |