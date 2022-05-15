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

#### 可任意选择

<demo-code transform>./demo/Strictly.vue</demo-code>

#### 关闭动画

<demo-code transform>./demo/NoAnimation.vue</demo-code>

#### 可选择

<demo-code transform>./demo/Selection.vue</demo-code>

#### 远程加载

<demo-code transform>./demo/Load.vue</demo-code>

#### 可拖动

<demo-code transform>./demo/Drag.vue</demo-code>

#### 虚拟列表 / 可过滤

<demo-code transform>./demo/Virtual.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| list | 渲染列表       | _TreeListItemCustom[]_          | []     |
| props | 参数 | _\{ key: string, title: string }_           | _key: 'key', title: 'title'_      |
| expands `v-model`   | 展开的项 | _(string \| number \| symbol)[]_ | -      |
| checked `v-model` | 选中项       | _(string \| number \| symbol)[]_                                                           | -  |
| checkable  | 是否可选中     | _boolean_                                                           | false   |
| virtual | 是否使用虚拟列表 | _boolean_ | false |
| getKey | 函数式获得 key 值 | _(item: TreeListItemCustom) => string \| number \| symbol_ | - |
| height | 元素高度，仅使用虚拟列表时有效 | _String_ | - |
| animation | 是否使用动画 | _boolean_ | true |
| animationMax | 动画中包含最多的子元素数量 | _number_ | 80 |
| filter | 过滤关键词 | _string_ | - |
| filterable | 是否可过滤 | _boolean_ | false |
| itemHeight | 项目高度，仅供虚拟列表使用 | _number_ | 30 |
| selectable | 是否可选择 | _boolean_ | - |
| selection `v-model` | 选择项 | _string \| number \| symbol_ | - |
| arrow | 是否显示箭头及箭头位置，默认位置为左 | _boolean \| 'left' \| 'right'_ | true |
| useRadio | 是否启用单选 | _boolean_ | false |
| exclude | 排除项 | _(string \| number \| symbol)[]_ | - |
| link | 是否显示连接线 | _boolean_ | false |
| onRemote `ref` | 远程加载回调 | _(list: TreeListItemCustom) => Promise\<TreeListItemCustom[]\>_ | - |
| draggable `ref` | 是否可拖动 | _boolean_ | false |
| checkStrictly | 是否可任意选择 | _boolean_ | false |
| autoExpands | 是否自动展开 | _boolean_ | false |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| select      | 选择某项后的回调       | _(selection: string \| number \| symbol, item: TreeListItemCustom) => void_          | -     |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| default | 默认插槽，会放置在最顶端 | - |
| title | 标题内容 | _...TreeListItemCustom, expanding: boolean_ |
| suffix | 标题内容后缀 | _...TreeListItemCustom, expanding: boolean_ |
| prefix | 标题内容前缀 | _...TreeListItemCustom, expanding: boolean_ |
| arrow | 指示箭头插槽 | _...TreeListItemCustom, expanding: boolean_ |

### Expose

| 方法名 | 说明 | 类型 |
| -- | -- | -- |
| getCheckedItems | 获得选中的元素 | _() => TreeListItemCustom[]_ |
| getFlattenList | 获得扁平化的列表 | _(getSet: boolean) => TreeListItemCustom[] \| Set\<TreeListItemCustom\>_ |
| getItemsCount | 获取叶子节点的数量 | _(filter: boolean) => number_ |
| checkAll | 全选 | _() => void_ |

## 类型

### TreeListItemCustom

| 名称 | 说明 | 类型 | 是否可选 |
| --- | --- | --- | --- |
| key | 唯一标识符 | _string \| number \| symbol_ | 是 |
| title | 标题 | _string_ | 是 |
| disabled | 是否禁用 | _boolean_ | 是 |
| remote | 是否使用远程加载 | _boolean_ | 是 |
| children | 子节点 | _TreeListItemCustom[]_ | 是 |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-tree-indent | 18px | 缩进距离 |
| --o-tree-font-size | 14px | 字号大小 |
| --o-tree-node-hegiht | 30px | 节点高度 |
| --o-tree-hover-bg | #fafafa | hover 时的背景 |
| --o-tree-link-bg | #ccc | 连接线颜色 |
| --o-tree-link-size | 1px | 连接线宽度 |
| --o-tree-padding-top-bottom | 5px | 节点上下内边距 |
| --o-tree-padding-left-right | 5px | 节点左右内边距 |
| --o-tree-dropline-size | 5px | 拖动线高度 |
| --o-tree-drop-bg | #eee | 拖动线背景 |
| --o-tree-arrow-size | 12px | 箭头尺寸 |
| --o-tree-arrow-color | #ccc | 箭头颜色 |
| --o-tree-selecting-color | #f5f5f5 | 选中背景色 |