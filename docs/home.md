# 介绍

### 关于

Obsession /əbˈseSHən/ 意为痴迷的，工程师痴迷着、以无限的热枕，不断地丰富和完善框架组件库中的内容。

### 特性

- 所有终端设备通用
- 相对其他组件库而言更强大的定制功能

### 升级前请先确认 Vue 版本

本库推荐 **Vue `>= 3.5.23`**。Vue `3.0.0 ~ 3.5.22` 也能正常安装使用，唯一差异是 `ScrollList` 在带 `transform: scale()` 的祖先容器中位移动画会异常。

**如果暂时无法升级 Vue，请停留在 `obsession-ui@1.1.15` 及更早版本。**

`peerDependencies` 声明为 `vue: ^3.0.0`，安装时不会报冲突，需要你自行判断。

这段兼容性要求的由来，以及各 Vue 版本区间的详细对照，见「开发指南 → Vue 版本兼容」。简单说：`ScrollList` 的滚动动画依赖 `TransitionGroup` 的位移测量，Vue 早期用的是受 `transform: scale` 干扰的 `getBoundingClientRect()`；本库作者把修复提交给了 Vue 官方（[PR #6108](https://github.com/vuejs/core/pull/6108)），已随 **Vue 3.5.23** 合入发布，因此组件库不再需要自带补丁副本。
