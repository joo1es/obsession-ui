# ActionSheet 动作菜单

### 介绍

这是一个几乎只在手机端才会用到的组件，但我们支持了PC端

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

## API

### Props

ActionSheet 组件可以使用全部 Modal 组件的 Props（预设默认值略有不同）。

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue `v-model`   | 是否显示动作菜单       | _boolean_          | false     |
| showCancel     | 是否显示取消按钮   | _boolean_           | true      |
| handler   | 是否显示移动柄，以及是否可以通过手势关闭 | _boolean_ | true      |
| description  | 描述       | _boolean_                                                           | - |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| default | 默认插槽，位置在描述与项之间 | - |
| description | 顶部描述 | - |
| item | 选项插槽 | ...ActionSheetRecord |
| cancel | 取消按钮插槽 | - |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| click | 每项点击事件 | _(record: DropdownRecord, done: () => void) => void_

## 类型

### ActionSheetRecord

| 名称 | 说明 | 类型 | 是否可选 |
| --- | --- | --- | --- |
| index | 唯一标识符 | _string \| number \| symbol_ | 是 |
| title | 标题 | _string \| VNode_ | 是 |
| icon | 图标 | _Component_ | 是 |
| disabled | 是否禁用 | _boolean_ | 是 |
| description | 描述 | _description_ | 是 |
| click | 点击事件，手动调用 done 关闭 | _(record?: ActionSheetRecord, done?: () => void) => void_ | 是 |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-action-sheet-font-size | 16px | 字体大小 |
|    --o-action-sheet-padding-top-bottom | 10px | 单项上下内边距 |
|    --o-action-sheet-padding-left-right | 20px | 单项左右内边距 |
|    --o-action-sheet-icon-right | 20px | 图标大小 |