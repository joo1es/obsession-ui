# Transition 渐变

### 介绍

过渡一定要平滑


## CollapseTransition 折叠渐变

### 引入

```js
import { createApp } from 'vue'
import { CollapseTransition } from 'obsession-ui'

const app = createApp()
app.use(CollapseTransition)
```

## 代码演示

#### 基本用法

<demo-code transform>./demo/Basic.vue</demo-code>

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| appear          | 是否初始渲染                                                      | _boolean_ | -      |
| group         | 是否使用 transition-group 组件                                                        | _boolean_                                                   | -     |
| mode  | 动画模式                                               | _'in-out' \| 'out-in' \| 'default'_                                                   | -      |
| onLeave   | 结束动画开始回调     | _Function_                                                   | -      |
| onAfterLeave   | 结束动画结束回调     | _Function_                                                   | -      |
| onAfterEnter   | 进入动画结束回调     | _Function_                                                   | -      |
| width | 是否是宽度渐变 | _boolean_                                                   | -      |
| reverse | 是否是反向动画 | _boolean_                                                   | -      |
| duration        | 动画持续时间                    | _string_                                                  | -  |
| delay        | 动画延迟                    | _string_                                                  | -  |