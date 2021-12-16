# Menu 菜单

### 介绍

服务员，这桌来一份菜单

### 引入

```js
import Vue from 'vue';
import { Popover } from 'obsession-ui';

Vue.use(Popover);
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 纵向

<demo-code transform>./demo/Vertical.vue</demo-code>

#### 折叠

<demo-code transform>./demo/Collapse.vue</demo-code>

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| modelValue `v-model`         | 激活项                                                        | _string \| number \| symbol_                                                   | -     |
| unfold `v-model:unfold`   | 展开项     | _(string \| number \| symbol)[]_                                                   | -      |
| vertical          | 是否纵向                                                      | _boolean_ | false      |
| list  | 渲染的菜单列表                                               | _MenuList_                                                   | []      |
| collapse   | 是否折叠     | _boolean_                                                   | false      |
| trigger   | Popover 呼出方式     | _'hover' \| 'click'_                                                   | 'click'      |
| showArrow | 是否显示指示箭头 | _boolean_ | true |
| width | 宽度（仅在纵向模式且非折叠的情况下有效） | _string_ | '400px' |

### Methods

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| update:modelValue         | 激活项                                                        | _(value: string \| number \| symbol) => void_                                                   | -     |
| update:unfold  | 展开项                                               | _(value: (string \| number \| symbol)[]) => void_                                                   | -      |
| click   | 点击任意项的事件回调，返回 _true_ 会阻止默认对激活项的修改     | _(value: MenuRecord) => void_                                                   | -      |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | -------- |
| title | 标题 | { ...MenuRecord } |

## 类型

### MenuRecord

| 名称 | 类型 | 是否可选 |
| --- | --- | --- |
| index | string \| number \| symbol | 否 |
| title | string | 是 |
| icon | Component | 是 |
| disabled | boolean | 是 |
| children | MenuRecord[] | 是 |

### MenuList

_MenuRecord[]_