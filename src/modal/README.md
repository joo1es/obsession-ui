# Modal 模态框

### 介绍

不想切换页面的时候用

### 引入

```js
import Vue from 'vue'
import { Modal } from 'obsession-ui'

Vue.use(Modal)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 自定义风格

<demo-code transform>./demo/Fluent.vue</demo-code>

#### 抽屉模式

<demo-code transform>./demo/Drawer.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| overlay      | Overlay 组件的 Props       | _Partial\<OverlayProps\> & Record\<string, any\>_          | {}     |
| modelValue `v-model`     | 是否显示模态框   | _boolean_           | -      |
| transitionName   | 过渡类名 | _string_ | _o-modal-fade_      |
| width  | 模态框的宽度，不填则为自适应       | _string \| number_                                                           | -  |
| showClose      | 是否显示关闭图标       | _boolean_                                                           | true   |
| title | 标题     | _string_                                                    | -     |
| border | 是否显示 title 和 footer 的边框       | _boolean_                                                    | true     |
| borderRadius | 是否圆角或设置圆角的大小 | _boolean \| string_ | true |
| doNotCloseMe | 组件是否不受全局 closeAll 方法影响 | _boolean_ | false |
| type | 类型，可选对话框或抽屉 | _'dialog' \| 'drawer'_ | `dialog` |
| from | 如果类型为抽屉，从哪边呼出 | _'left' \| 'right' \| 'top' \| 'bottom'_ | `bottom` |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| update:modelValue     | 是否显示模态框   | _(value: boolean) => void_           | -      |
| open     | 打开的回调   | _() => void_           | -      |
| afterOpen     | 打开动画结束后的回调   | _() => void_           | -      |
| close     | 关闭的回调   | _() => void_           | -      |
| afterClose     | 关闭动画结束后的回调   | _() => void_           | -      |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
| title | 标题（头部） |
| footer | 尾部 |

### closeAllModals 函数

在路由跳转时使用此方法，可直接关闭所有的模态框

```js
import { closeAllModals } from 'obsession-ui'
closeAllModals()
```

#### 函数签名
_() => void_

### Dialog 函数

快速创建一个对话框

```js
import { Dialog } from 'obsession-ui'
Dialog({
    title: '提示',
    content: '提示的内容'
})
```

#### 函数签名
_(options?: DialogOptions, props?: ModalProps) => Promise\<void\>_

#### DialogOptions 类型

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| title      | 标题       | _VNode \| string_          | -     |
| content     | 内容   | _VNode \| string_           | -      |
| cancelText   | 取消文本 | _VNode \| string_      | '取消' |
| confirmText  | 确认文本       | _VNode \| string_                                                           | '确认'  |
| footer | 自定义底部 |  _(close?: () =\> void) =\> VNode \| string_ | - |
| showFooter      | 是否显示底部       | _boolean_                                                           | true   |
| showCancel      | 是否显示取消       | _boolean_                                                           | true   |
| showConfirm      | 是否显示确认       | _boolean_                                                           | true   |
| spaceProps | Space 组件的 props     | _SpaceProps_                                                    | -     |
| cancelProps | 取消按钮组件的 props     | _ButtonProps_                                                    | -     |
| confirmProps | 确认按钮组件的 props     | _ButtonProps_                                                    | -     |
