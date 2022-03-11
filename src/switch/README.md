# Switch 开关

### 介绍
从 iPhone 元年开始，我才知道还有这么丝滑的组件

### 引入

```js
import { createApp } from 'vue'
import { Switch } from 'obsession-ui'

const app = createApp()
app.use(Switch)
```

## 代码演示

#### 基础用法

<demo-code transform>
./Demo/Basic.vue
</demo-code>

#### 调整 active 的值

<demo-code transform>
./Demo/Value.vue
</demo-code>

#### 定制

<demo-code transform>
./Demo/Custom.vue
</demo-code>

#### 禁用

<demo-code transform>
./Demo/Disabled.vue
</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue `v-model`      | 双向绑定的值       | _any_          | -     |
| activeValue     | 激活的值   | _any_           | true      |
| inactiveValue   | 未激活的值 | _any_ | true      |
| activeColor  | 激活的颜色       | _string_                                                           | -  |
| inactiveColor  | 未激活的颜色       | _string_                                                           | -   |
| activeText  | 激活的文字       | _string_                                                           | -  |
| inactiveText  | 未激活的文字       | _string_                                                           | -   |
| activeText | 激活的文本 | _string_ | - |
| inactiveText | 未激活的文本 | _string_ | - |
| width | 宽度 | _string \| number_ | - |
| height | 高度 | _string \| number_ | - |
| borderRadius | 圆角 | _string \| number_ | - |
| disabled | 是否禁用 | _boolean_ | false |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| change | 值改变的事件 | _(value: any) => void_ | - |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| activeText | 激活的文字 |
| inactiveText | 未激活的文字 |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-switch-active-color | var(--o-color-primary) | 激活的颜色 |
| --o-switch-inactive-color | rgb(215, 218, 226) | 未激活的颜色 |
| --o-switch-width | 40px | 开关的宽度 |
| --o-switch-height | 18px | 开关的高度 |
| --o-switch-button-width | var(--o-switch-height) | 按钮的宽度 |
| --o-switch-border-radius | 20px | 圆角大小 |
| --o-switch-border | 4px solid var(--o-switch-inactive-color) | 边框样式 |
| --o-switch-duration | .3s | 动画的持续时间 |
| --o-switch-text-font-size | 12px | 文本的尺寸 |
| --o-switch-text-padding | 0 5px | 文本的padding |
| --o-switch-text-color | #fff | 文本的颜色 |

