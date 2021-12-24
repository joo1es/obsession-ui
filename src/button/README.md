# Button 按钮

### 介绍

能点的

## 代码演示

### 基础用法

```html
<o-button>Default</o-button>
<o-button type="primary">Primary</o-button>
<o-button type="success">Success</o-button>
<o-button type="warning">Warning</o-button>
<o-button type="danger">Danger</o-button>
```

<demo-code transform>./demo/Basic.vue</demo-code>

### 禁用

```html
<o-button disabled>Default</o-button>
<o-button type="primary" disabled>Primary</o-button>
<o-button type="success" disabled>Success</o-button>
<o-button type="warning" disabled>Warning</o-button>
<o-button type="danger" disabled>Danger</o-button>
```

<demo-code transform>./demo/Disabled.vue</demo-code>

### 图标

```html
<o-space>
    <o-button :icon="Add">
        Default
    </o-button>
    <o-button type="primary">
        <template #icon>
            <AccumulationSnow />
        </template>
        Primary
    </o-button>
    <o-button type="success" :icon="MacOption" />
    <o-button type="warning" round :icon="Cad">
        Warning
    </o-button>
    <o-button type="danger" round :icon="MailAll" />
</o-space>
```

<demo-code transform>./demo/Icon.vue</demo-code>

### 尺寸

```html
<o-space align="end">
    <o-button type="primary" size="large">
        Large
    </o-button>
    <o-button>
        Default
    </o-button>
    <o-button type="success" size="small">
        Small
    </o-button>
    <o-button type="warning" size="mini">
        Mini
    </o-button>
</o-space>
```

<demo-code transform>./demo/Size.vue</demo-code>

### Loading

```html
<o-space align="end">
    <o-button type="primary" size="large">
        Large
    </o-button>
    <o-button>
        Default
    </o-button>
    <o-button type="success" size="small">
        Small
    </o-button>
    <o-button type="warning" size="mini">
        Mini
    </o-button>
</o-space>
```

<demo-code transform>./demo/Loading.vue</demo-code>

## API

### Props

| 参数         | 说明                                                          | 类型                                                       | 默认值 |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| icon          | 图标                                                      | _string \| Component_ | -      |
| type         | 按钮类型                                                        | _ButtonTypes \| Record<string, string>_                                                   | default     |
| size         | 按钮尺寸                                                        | _ButtonSize \| Record<string, string>_                                                   | default     |
| tag  | 渲染的标签                                               | _string \| Component_                                                   | button      |
| disabled   | 是否禁用     | _boolean_                                                   | false      |
| loading   | 是否加载中     | _boolean_                                                   | false      |
| round   | 是否使用大圆角     | _boolean_                                                   | false      |
| ghost   | 是否 Ghost     | _boolean_                                                   | false      |
| dashed | 是否虚线边框 | _boolean_ | false |
| block | 是否为块元素 | _boolean_ | false |
| iconPosition | 图标位置 | _'left' \| 'right'_ | left |
| buttonType | 原生 button 的 type | _string_ | - |
| hover | 是否需要 hover 效果，手机端关闭可以避免 hover 残留 | _boolean_ | true |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
| icon | 图标 |