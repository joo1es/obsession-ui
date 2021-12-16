# Scroll List 滚动列表

### 介绍

一切不过是障眼法

### 引入

```js
import Vue from 'vue';
import { Space } from 'obsession-ui';

Vue.use(Space);
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

## API

### Props

所有的滚动，在元素 >= 2 的情况下才有效。

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| height   | 容器高度       | _number \| string_          | 'auto'     |
| tag     | 容器渲染的标签   | _string_           | 'div'      |
| duration   | 滚动的间隔时长 `ms` | _number_ | 2000      |
| animationDuration  | 滚动的动画时长 `ms`       | _number_                                                           | 400  |
| hoverToStop      | 鼠标放置在上面时是否停止动画       | _boolean_                                                           | true   |
| space | 每行间距     | _number \| string_                                                    | 0     |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |