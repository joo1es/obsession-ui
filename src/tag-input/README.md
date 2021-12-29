# TagInput 标签输入

### 介绍

还是需要给一些东西定标签

### 引入

```js
import { createApp } from 'vue'
import { TagInput } from 'obsession-ui'

const app = createApp()
app.use(TagInput)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 尺寸

<demo-code transform>./demo/Size.vue</demo-code>

#### 显示最大值及限制

<demo-code transform>./demo/Limit.vue</demo-code>

#### 自定义标签

<demo-code transform>./demo/Custom.vue</demo-code>

#### 只读和禁用

<demo-code transform>./demo/Readonly.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue `v-model`      | 双向绑定的数组       | _string[]_          | -     |
| clearable     | 是否显示清空按钮   | _boolean_           | -      |
| tagProps   | 标签的 Props | _Partial\<TagProps\> & Record\<string, any\>_ | {}      |
| placeholder  | 未输入时显示的文本       | _string_                                                           | '请输入标签'  |
| allowRepeat  | 是否允许标签重复       | _boolean_                                                           | false   |
| delimiter | 分隔符，当输入分隔符时就会新增一个标签 | _string[]_ | [] |
| readonly | 是否是只读 | _boolean_ | false |
| disabled | 是否是禁用 | _boolean_ | false |
| size | 尺寸 | _'small' \| 'default' \| 'medium' \| 'large'_ | 'default' |
| spaceProps | Space 组件的 Props，用于设置标签之间的距离 | _Partial\<SpaceProps\> & Record\<string, any\>_ | {} |
| max | 最多显示的 tag 数量 | _number_ | - |
| limit | 限制最多可输入的 tag 数量 | _number_ | - |
| trim | 是否去除两边空格 | _boolean_ | false |
| keyboardDelete | 是否启用键盘删除 | _boolean_ | true |
| beforePush | 在推送标签之前的回调函数，返回字符串会替代原来的文本 | _(text: string) => string \| void_ | - |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| update:modelValue      | 双向绑定的数组       | _(value: string[]) => void_          | -     |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| tag | 标签插槽 | _tag: string, index: number, active: boolean, close: () => void_ |
| close-icon | 关闭图标插槽 | - |
