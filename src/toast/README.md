# Toast 吐司提示

### 介绍

长的像面包就叫面包了

### 全局引入

```js
import { createApp } from 'vue'
import { Toast } from 'obsession-ui'

const app = createApp()
app.use(Toast)

// this.$toast
```

### 组件内引入

```js
import { Toast } from 'obsession-ui'

Toast({
    message: 'Hello, world'
})
```

## 代码演示

#### 基础用法

<demo-code>./demo/Basic.vue</demo-code>

## API

### ToastOptions

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| drak      | 是否暗黑模式       | _boolean_          | false     |
| message     | 提示内容   | _VNode \| string_           | -      |
| duration  | 持续显示多久后消失 `ms`       | _number_                                                           | 3000  |
| placement      | 位置       | _'top'\| 'bottom' \| 'center'_                                                           | 'bottom'   |
| style | 自定义样式 | _string \| CSSProperties_ | - |
| transition | 过渡名 | _string_ | 'o-toast-fade' |