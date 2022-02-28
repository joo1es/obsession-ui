# Icon 图标

### 介绍

比象形文字更象形

### 引入

```js
import { createApp } from 'vue'
import { Icon } from 'obsession-ui'

const app = createApp()
app.use(Icon)
```

## 代码演示

### 基础用法

```html
<o-icon :size="30">
    <Add />
</o-icon>
```

<demo-code transform>./demo/Basic.vue</demo-code>

### 以 Class 的形式添加图标

```html
<o-icon :size="30" name="add-o" />
```

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| size          | 图标大小                                                      | _string \| number_ | -      |
| color         | 图标颜色                                                        | _string_                                                   | -     |
| tag  | 渲染的标签                                               | _string_                                                   | span      |
| name   | 如果不存在默认插槽，会在内部再渲染一个 i 标签，其 class 对应组件的 **name**     | _string_                                                   | -      |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
