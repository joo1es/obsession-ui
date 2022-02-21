## Pull Refresh 下拉刷新

### 介绍

手机端刷新的最佳交互

### 引入

```js
import { createApp } from 'vue'
import { PullRefresh } from 'obsession-ui'

const app = createApp()
app.use(PullRefresh)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| disabled      | 是否禁用下拉刷新       | _boolean_          | false     |
| pullDistance     | 下拉距离   | _number_           | 100      |
| refresh   | 下拉回调函数 | _() => Promise\<void>_ | -      |
| rootElement  | 指定检查滚动距离的元素，不指定则为父级中的可滚动元素       | _HTMLElement_                                                           | -  |
| wheelRefresh | 是否可以通过滚轮触发下拉刷新 | _boolean_ | false |