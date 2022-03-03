# Slider 滑块

### 介绍

一个可以互动的进度条

### 引入

```js
import { createApp } from 'vue'
import { Slider } from 'obsession-ui'

const app = createApp()
app.use(Slider)
```

## 代码演示

#### 基础用法

<demo-code transform>
./demo/Basic.vue
</demo-code>

#### 范围选择

<demo-code transform>
./demo/Range.vue
</demo-code>

#### 标记

<demo-code transform>
./demo/Mark.vue
</demo-code>

#### 步长和显示提示

<demo-code transform>
./demo/Step.vue
</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue `v-model`      | 滚动条的值，可以为一个数组       | _number \| number[]_          | -     |
| max     | 最大值   | _number_           | 100      |
| min   | 最小值 | _number_ | 0      |
| step  | 步长       | _number_                                                           | 1  |
| vertical      | 是否是纵向       | _boolean_                                                           | false   |
| height | 如果是纵向，滚动条的高度     | _number \| string_                                                    | 100     |
| reverse | 是否翻转       | _boolean_                                                    | false     |
| marks | 标记       | _Record\<number, string> \| number[]_                                                    | -     |
| showTip | 是否显示提示 | _boolean_ | false |

## 定制

### CSS 变量

因为 slider 本身修改样式比较困难，所以提供了大量的 css 变量供定制

#### 轨道 Track

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-slider-track-background | #f5f5f5 | 轨道的背景颜色 |
| --o-slider-track-height | 5px | 轨道的高度 |
| --o-slider-track-border-radius | 5px | 轨道的圆角 |
| --o-slider-track-active-background | var(--primary-color) | 激活轨道的背景颜色 |

#### 滑块 Thumb

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-slider-thumb-height | 20px | 滑块高度 |
| --o-slider-thumb-width | 20px | 滑块宽度 |
| --o-slider-thumb-border-radius | 50% | 滑块的圆角 |
| --o-slider-thumb-duration | .2s | 滑块过渡的时长 |
| --o-slider-thumb-border | 4px solid #f5f5f5 | 滑块默认状态下的 border |
| --o-slider-thumb-background | var(--primary-color) | 滑块默认状态下的背景 |
| --o-slider-thumb-transform | none | 滑块默认状态下的 transform |
| --o-slider-thumb-shadow | none | 滑块默认状态下的 drop-shadow |
| --o-slider-thumb-hover-border | 3px solid #f5f5f5 | 滑块 hover 状态下的 border |
| --o-slider-thumb-hover-background | var(--primary-color) | 滑块 hover 状态下的背景 |
| --o-slider-thumb-hover-transform | none | 滑块 hover 状态下的 transform |
| --o-slider-thumb-hover-shadow | none | 滑块 hover 状态下的 drop-shadow |
| --o-slider-thumb-active-border | 3px solid #f5f5f5 | 滑块 active 状态下的 border |
| --o-slider-thumb-active-background | var(--primary-color) | 滑块 active 状态下的背景 |
| --o-slider-thumb-active-transform | none | 滑块 active 状态下的 transform |
| --o-slider-thumb-active-shadow | none | 滑块 active 状态下的 drop-shadow |

#### 标记 Mark

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-slider-mark-background | var(--o-slider-track-background) | 标记的背景 |
| --o-slider-mark-active-background | var(--o-slider-track-active-background) | 标记被激活的背景 |
| --o-slider-mark-color | #666 | 标记文字的颜色 |
| --o-slider-mark-font-size | 12px | 标记文字的大小 |
| --o-slider-mark-width | 2px | 标记的宽度 |
| --o-slider-mark-height | 8px | 标记的高度 |

#### 提示 Tip

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-slider-tip-color | #fff | 提示文字的颜色 |
| --o-slider-tip-background | rgba(0, 0, 0, .8) | 提示的背景颜色 |
| --o-slider-tip-padding | 1px 5px | 提示的 padding |
| --o-slider-tip-border-radius | 4px | 提示的圆角 |