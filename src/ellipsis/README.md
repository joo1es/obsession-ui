# Ellipsis 文本省略

### 介绍

有些事情你永远不必问

### 引入

```js
import Vue from 'vue';
import { Ellipsis } from 'obsession-ui';

Vue.use(Ellipsis);
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 多行

<demo-code transform>./demo/Line.vue</demo-code>

#### 自定义内容

<demo-code transform>./demo/Custom.vue</demo-code>

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| title | 替换展示的内容                                                      | _string_ | -      |
| tooltip         | Tooltip 组件的 props                                                        | _TooltipProps_                                                   | {}     |
| noTooltip  | 是否关闭 Tooltip | _boolean_                                                   | false      |
| line | 是否是多行模式     | _number_                                                   | 1      |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
| title | 内容替换插槽 |