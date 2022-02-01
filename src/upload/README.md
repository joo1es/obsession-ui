# Upload 上传

### 介绍

总感觉有些 UI 框架的上传组件不自由，这是一个任意选择可控或不可控的上传组件

### 引入

```js
import { createApp } from 'vue'
import { Upload } from 'obsession-ui'

const app = createApp()
app.use(Upload)
```

## 代码演示

#### 基础用法

<demo-code transform>./demo/Basic.vue</demo-code>

#### 拖拽上传

<demo-code transform>./demo/Drop.vue</demo-code>

#### 仅使用文件列表

<demo-code transform>./demo/List.vue</demo-code>

#### 使用卡片预设

<demo-code transform>./demo/Card.vue</demo-code>

#### 禁用

<demo-code transform>./demo/Disabled.vue</demo-code>

## API

### Props

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| modelValue `v-model` | 文件列表，如果该 Prop 为 `undefined`，则组件为非受控模式       | _UploadFile[]_          | -     |
| multiple | 是否可多选 | _boolean_           | _false_      |
| accept   | 接收的文件格式，如 ".jpg,.png,.gif" | _string_ | -      |
| drop | 是否可拖拽上传       | _boolean_                                                           | -  |
| delete  | 删除前的回调函数     | _(file: UploadFile) => Promise\<void>_                                                           | -   |
| upload | 上传前的回调函数，filterFiles 为仅 Waiting 状态的文件，file 为所有文件 | _(filterFiles: UploadFile[], file: UploadFile[]) => Promise\<void>_ | - |
| pin | 列表是否固定（禁止删除） | _boolean_ | false |
| autoUpload | 是否在选择文件后自动上传 | _boolean_ | false |
| limit | 文件数量限制 | _number_ | - |
| showFileList | 是否显示文件列表 | _boolean_ | true |
| showButton | 是否显示上传按钮 | _boolean_ | true |
| disabled | 是否为禁用状态 | _boolean_ | false |
| preset | 预设，可选值为 card | _boolean_ | 'list' |

### Methods

| 参数      | 说明           | 类型                                                                | 默认值 |
| --------- | -------------- | ------------------------------------------------------------------- | ------ |
| update:modelValue      | 文件列表更新，若 `modelValue` 的值为 `undefined`，则该值也无效      | _(files: UploadFile[]) => void_         | -     |
| itemClick | 列表项点击事件 | _(e: Event, value: UploadFile) => void_ | - |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | --- |
| default | 上传按钮插槽 | _start: () => void, dragover: boolean_ |
| description | 描述插槽，位置在上传按钮和文件列表之间 | - |
| lists | 列表整体替换插槽 | _files: UploadFile[]_ |
| list | 单个列表替换插槽 | _file: UploadFile_ |
| cover | 图片的覆盖插槽，适用于 `presets: card` | _file: UploadFile_ |

### Expose

| 方法名 | 说明 | 类型 |
| -- | -- | -- |
| submit | 手动上传函数 | _() => Promise\<void>_ |
| addUpload | 手动添加上传文件 | _(files: FileList \| File[]) => Promise\<void>_ |

## 类型

### UploadFile

| 名称 | 说明 | 类型 | 是否可选 |
| --- | --- | --- | --- |
| name | 显示的文件名 | _string_ | 否 |
| status | 文件状态，不填则为 Success | _UploadFileStatus_ | 是 |
| file | 文件 | _File_ | 是 |
| pin | 是否固定（禁止被删除） | _boolean_ | 是 |
| url | 文件链接，设置后在列表会被渲染被 a 标签 | _string_ | 是 |
| progress | 上传进度，仅在状态为 Loading 的时候被显示 | _number_ | 是 |
| [x: string] | 任意内容 | _any_ | 是 |

### UploadFileStatus

| 指代值 | 实际值 | 说明 |
| --- | --- | --- |
| Success | _0_ | 成功 |
| Waiting | _1_ | 等待上传 |
| Loading | _2_ | 上传中 |
| Fail | _3_ | 上传失败 |

## 定制

### 全局 CSS 变量

| 变量名 | 默认值 | 说明 |
| ---- | ---- | ---- |
| --o-upload-success | var(--success-color) | 成功状态图标颜色 |
| --o-upload-waiting | var(--primary-color) | 等待上传状态图标颜色 |
| --o-upload-fail | var(--danger-color) | 上传失败状态图标颜色 |
| --o-upload-loading | #d9d9d9 | 加载中状态图标颜色 |
| --o-upload-drag-icon-color | #d9d9d9 | 拖动图标颜色 |
| --o-upload-drag-icon-size | 64px | 拖动图标大小 |
| --o-upload-font-size | 13px | 文本字体大小 |
| --o-upload-icon-size | 15px | 图标字体大小 |
| --o-upload-active-color | var(--primary-color) | 激活颜色 |
| --o-upload-item-padding | 5px | 列表项内边距 |
| --o-upload-item-hover-bg | #fcfcfc | 列表项 Hover 背景 |
| --o-upload-card-color | rgb(215, 217, 219) | Card 预设下的字体颜色 |
| --o-upload-card-bg | rgb(246, 247, 249) | Card 预设下的背景颜色 |
| --o-upload-card-active-bg | rgb(240, 241, 243) | Card 预设下的激活背景颜色 |
| --o-upload-card-overlay-bg | rgba(0, 0, 0, 153) | Card 预设下的遮罩背景颜色 |