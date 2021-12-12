# Grid 网格

### 介绍

生活是一张大网

### 引入

```js
import Vue from 'vue';
import { Gird, GridItem } from 'obsession-ui';

Vue.use(Gird);
Vue.use(GridItem);
```

## 代码演示

### 基础用法

```html
<o-gird :default-span="6">
  <o-grid-item> Hello </o-grid-item>
  <o-grid-item> Hello </o-grid-item>
  <o-grid-item> Hello </o-grid-item>
  <o-grid-item> Hello </o-grid-item>
</o-gird>
```

<demo-code transform>./demo/Basic.vue</demo-code>

#### Gird 系列的组件都可以使用缩写

```html
<o-g :default-span="6">
  <o-gi> Hello </o-gi>
  <o-gi> Hello </o-gi>
  <o-gi> Hello </o-gi>
  <o-gi> Hello </o-gi>
</o-g>
```

### 间距

```html
<o-g :default-span="1" :gap="[10, 15]" :cols="4">
  <o-gi v-for="number in 20" :key="number" />
</o-g>
```

<demo-code transform>./demo/Gap.vue</demo-code>

### 纵向排列

```html
<o-grid :default-span="1" :gap="[10, 15]" :cols="4">
  <o-grid-item :row-span="2" class="auto" name="13232323" />
  <o-grid-item :offset="1" />
  <o-grid-item />
  <o-grid-item />
  <o-grid-item />
  <o-grid-item />
</o-grid>
```

<demo-code transform>./demo/Y.vue</demo-code>

## Gird API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| gap          | 间距大小                                                      | _string \| number \| [string \| number, string \| number]_ | 0      |
| cols         | 总列数                                                        | _number_                                                   | 24     |
| defaultSpan  | 内部项默认 span                                               | _number_                                                   | 1      |
| placeItems   | align-items 和 justify-items 属性的简写，用于设置对齐模式     | _string_                                                   | -      |
| placeContent | align-content 和 justify-content 属性的简写，用于设置对齐模式 | _string_                                                   | -      |
| dense        | 是否行优先，设置为 `true` 后会优先填充空隙                    | _boolean_                                                  | false  |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |

## GirdItem API

### Props

| 参数        | 说明   | 类型     | 默认值 |
| ----------- | ------ | -------- | ------ |
| span        | 占据列 | _number_ | -      |
| rowSpan     | 占据行 | _number_ | -      |
| offset      | 左偏移 | _number_ | 0      |
| offsetRight | 右偏移 | _number_ | 0      |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
