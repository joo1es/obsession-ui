# Popover 气泡弹出框

### 介绍

可以存放一些简单的提示和操作

### 引入

```js
import Vue from 'vue';
import { Popover } from 'obsession-ui';

Vue.use(Popover);
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 位置

<demo-code transform>./demo/Placement.vue</demo-code>

#### 触发方式

<demo-code transform>./demo/Trigger.vue</demo-code>

#### 嵌套

<demo-code transform>./demo/Nested.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue      | 是否展示 popover       | _boolean_          | -     |
| trigger     | 触发方式   | _'click' \| 'hover' \| 'focus' \| 'none'_           | click      |
| placement   | 展示位置 | _'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'_ | top      |
| arrow  | 是否显示指示箭头       | _boolean_                                                           | true  |
| zIndex      | Z 轴高度       | _number_                                                           | -   |
| raw | 不附加样式     | _boolean_                                                    | false     |
| to | Popover 元素存放在哪个位置，设为 `false` 则为父元素       | _string \| HTMLElement \| false_                                                    | -     |
| width | 宽度，设为 `trigger` 或 `target` 则与触发元素宽度相同 | _number \| 'trigger' \| 'target'_ | - |
| flip | 在空间不足时，是否移动 popover 到其他位置 | _boolean_ | true |
| duration | Hover 触发模式，鼠标在元素间移动的等待时长 | _boolean_ | 100 |
| dark | 是否是黑暗模式 | _boolean_ | false |
| transition | 过渡动画 | _string_ | `popover-transition` |
| closeOnClickOutside | 点击外部是否关闭 popover | _boolean_ | true |
| popoverClass | Popover 元素的 class | _string \| Record<string, boolean>_ | - |
| popoverStyle | Popover 元素的 style | _string \| CSSProperties_ | - |
| offset | 偏移，`[x, y]` | _number[]_ | - |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| update:modelValue      | 改变是否展示 popover       | _(value: boolean) => void_          | -     |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
| target | 触发元素 |
