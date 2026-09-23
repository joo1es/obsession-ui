# 介绍

### 关于

Obsession /əbˈseSHən/ 意为痴迷的，工程师痴迷着、以无限的热枕，不断地丰富和完善框架组件库中的内容。

### 演示

[文档 & 演示地址](https://joo1es.github.io/obsession-ui)

### 特性

- 所有终端设备通用
- 相对其他组件库而言更强大的定制功能

### 升级前请先确认 Vue 版本

**升级 obsession-ui 之前，请先确认你项目里的 Vue 版本。**

| 你的 Vue 版本 | 可用性 | 说明 |
| --- | --- | --- |
| `>= 3.5.23` | **推荐** | 完整行为，包含 `transform: scale` 下的位移动画修正 |
| `3.0.0 ~ 3.5.22` | 可用 | 功能完整；唯一差异见下方「关于 `TransitionGroup` 与 `transform: scale`」 |
| `< 3.0.0` | 不支持 | 本库是 Vue 3 组件库 |

本库的 `peerDependencies` 声明为 `vue: ^3.0.0`，**安装时不会报版本冲突** —— 也就是说包管理器不会替你拦住上表第二行的情况，需要你自己判断。

> **如果你的项目暂时无法升级 Vue，请停留在 `obsession-ui@1.1.15` 及更早版本。**
> 这些版本内置了打过补丁的 `TransitionGroup`，在 Vue 3.2.x 上也能得到正确动画；本次改动之后发布的版本已将这份补丁移除。

### 关于 `TransitionGroup` 与 `transform: scale`

`ScrollList` 的滚动动画基于 `TransitionGroup` 对子元素的**位移测量**。Vue 早期实现使用 `getBoundingClientRect()`（视口坐标），当祖先元素带 `transform: scale()` 时，换算出的位移是错的 —— 表现为列表滚动时元素「跳一下」。

这个问题由本库作者提交给 Vue 官方，并已被合入：

**[vuejs/core PR #6108](https://github.com/vuejs/core/pull/6108)** — `fix(TransitionGroup): use offsetLeft and offsetTop instead of getBoundingClientRect to avoid transform scale affect animation`

- `2022-06-14` 提交
- `2025-11-05` 合入 `main`（合并提交 `dc4dd594`）
- 随 **Vue 3.5.23** 发布

在上游吸收这份修复之前，本库一直内置着一份打过补丁的 `TransitionGroup` 副本（`src/scroll-list/Transition/`）。既然修复已经进入 Vue 本体，这份副本已被**删除**，`ScrollList` 改为直接使用 Vue 内置的 `TransitionGroup` —— 同时也去掉了对 `@vue/runtime-core`、`@vue/shared` 这两个内部包（且此前并未在 `package.json` 中声明）的隐式依赖。

另外需要知道：Vue **3.5.28** 起，上游又把这个测量方式换成了更精确的实现（仍然用 `getBoundingClientRect()`，但用 `rect.width / offsetWidth` 反推祖先 scale，位移改为除以 scale），精度优于本库当年的补丁。

**所以根治方式始终是升级 Vue，而不是指望组件库长期兜底。** 各版本区间的详细对照见文档站「开发指南 → Vue 版本兼容」。

### 依赖声明

除 `vue` 外，本库的 `Breadcrumb` 组件还依赖 `vue-router`（使用 `to` 属性时渲染为 `RouterLink`）。该依赖此前未在 `package.json` 中声明，现已补入 `peerDependencies`：

```json
{
    "peerDependencies": {
        "vue": "^3.0.0",
        "vue-router": "^4.0.0"
    }
}
```

即使你的项目并不使用 `Breadcrumb`，`vue-router` 也会在本库的聚合入口中被静态引入，因此它是**必需的 peer 依赖** —— 未安装时包管理器会给出警告。
