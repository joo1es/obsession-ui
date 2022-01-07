# Tree 树

### 介绍

开枝散叶

### 引入

```js
import { createApp } from 'vue'
import { Tree } from 'obsession-ui'

const app = createApp()
app.use(Tree)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 关闭动画

<demo-code transform>./demo/NoAnimation.vue</demo-code>

#### 虚拟列表 / 可过滤

<demo-code transform>./demo/Virtual.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| list | 渲染列表       | _TreeListItemCustom[]_          | []     |
| props | 参数 | _\{ key: string, title: string }_           | _key: 'key', title: 'title'_      |
| expends `v-model`   | 展开的项 | _(string \| number \| symbol)[]_ | -      |
| checked `v-model` | 选中项       | _(string \| number \| symbol)[]_                                                           | -  |
| checkable  | 是否可选中     | _boolean_                                                           | false   |
| virtual | 是否使用虚拟列表 | _boolean_ | false |
| getKey | 函数式获得 key 值 | _(item: TreeListItemCustom) => string \| number \| symbol_ | - |
| height | 元素高度，仅使用虚拟列表时有效 | _String_ | '300px' |
| animation | 是否使用动画 | _boolean_ | true |
| animationMax | 动画中包含最多的子元素数量 | _number_ | 80 |
| filterable | 是否可过滤 | _filterable_ | false |
| itemHeight | 项目高度，仅供虚拟列表使用 | _number_ | 30 |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| default | 默认插槽，会放置在最顶端 | - |
| title | 标题内容 | _...TreeListItemCustom_ |

## 类型

### TreeListItemCustom

| 名称 | 说明 | 类型 | 是否可选 |
| --- | --- | --- | --- |
| key | 唯一标识符 | _string \| number \| symbol_ | 是 |
| title | 标题 | _string_ | 是 |
| disabled | 是否禁用 | _boolean_ | 是 |
| children | TreeListItemCustom[] | 是 |