# Masonry 瀑布流

### 介绍

通常你会在购物软件里看到它

### 引入

```js
import { createApp } from 'vue'
import { Masonry } from 'obsession-ui'

const app = createApp()
app.use(Masonry)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| tag      | 渲染的标签       | _string \| Component_          | div     |
| columnTag | 内部 column 渲染的标签 | _string \| Component_ | div |
| columnProps | 内部 column 的 props | _Record\<string, any\>_ | {} |
| cols | 列数，可以写作 { default: 2, 1600: 3 } 用于媒体查询 | _string \| number \| Record\<string \| number, string \| number\>_ | 2 |
| gutter | 间距，可以写作 { default: 5, 1600: 10 } 用于媒体查询 | _string \| number \| Record\<string \| number, string \| number\>_ | 0 |