# Badge 徽章

### 介绍

强迫症福音

### 引入

```js
import { createApp } from 'vue'
import { Badge } from 'obsession-ui'

const app = createApp()
app.use(Badge)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 定制

<demo-code transform>./demo/Custom.vue</demo-code>

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| value | Badge 显示的值，如果不填写，则显示为 dot 模式                                                      | _number \| string_ | -      |
| color         | 背景颜色                                                        | _string_                                                   | '#f56c6c'     |
| hidden  | 是否隐藏徽章 | _boolean_                                                   | false      |
| max | 徽章数字最大值，如果使用 slot 或者 value 的类型为 string 则无效     | _number_                                                   | -      |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
| value | 值替换插槽 |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-badge-size | 10px | 徽章大小 |
| --o-badge-font-size | 13px | 徽章文字大小 |
| --o-badge-color | #fff | 徽章文字颜色 |