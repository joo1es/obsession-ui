# Vue 版本兼容

### 一句话结论

- **推荐使用 Vue `>= 3.5.23`**，此时本库行为完整。
- Vue `3.0.0 ~ 3.5.22` 也能用，功能不受影响，但 `ScrollList` 在 `transform: scale` 容器中的位移动画会异常。
- **如果暂时不能升级 Vue，请停留在 `obsession-ui@1.1.15` 及更早版本。**

### 兼容性总览

| Vue 版本 | 安装 | 运行 | 行为 |
| --- | --- | --- | --- |
| `>= 3.5.23` | 正常 | 正常 | 完整 |
| `3.0.0 ~ 3.5.22` | 正常 | 正常 | `ScrollList` 在 `transform: scale` 容器中的位移动画异常 |
| `< 3.0.0` | 不支持 | — | 本库是 Vue 3 组件库 |

本库 `peerDependencies` 声明为 `vue: ^3.0.0`，**安装阶段不会报版本冲突**。也就是说，上表第二行这种「能装上但有一处行为差异」的情况，包管理器不会替你拦住，需要使用者自行判断。

### 背景：一个被合入 Vue 官方的修复

`ScrollList` 的滚动动画基于 `TransitionGroup` 对子元素的**位移测量**。

Vue 早期实现使用 `getBoundingClientRect()` 记录元素位置。这个方法返回的是**视口坐标**，会受祖先元素 `transform: scale()` 影响 —— 在一个被缩放过的容器里，前后两次测量的差值并不等于元素真实的布局位移，于是动画会出现「跳一下」的现象。

本库作者把这个问题提给了 Vue 官方并给出了修复：

**[vuejs/core PR #6108](https://github.com/vuejs/core/pull/6108)**

```
fix(TransitionGroup): use offsetLeft and offsetTop instead of getBoundingClientRect
to avoid transform scale affect animation
```

| | |
| --- | --- |
| 提交时间 | `2022-06-14` |
| 合入时间 | `2025-11-05`，目标分支 `main` |
| 合并提交 | `dc4dd594` |
| 首个包含该修复的版本 | **Vue 3.5.23** |

改动思路很直接：改用 `offsetLeft / offsetTop` 记录位置。这两个属性返回的是**布局坐标**（相对于 `offsetParent`），不受祖先 `transform` 影响，因此在缩放容器里也能算出正确的位移。

### 各版本区间的测量方式

| Vue 版本 | `TransitionGroup` 的位移测量方式 | scale 容器中的表现 |
| --- | --- | --- |
| `<= 3.5.22` | `getBoundingClientRect()`，无 scale 处理 | 错误 |
| `3.5.23 ~ 3.5.27` | `offsetLeft / offsetTop` —— 即 PR #6108 的方案 | 正确 |
| `>= 3.5.28` | `getBoundingClientRect()` + 用 `rect.width / offsetWidth` 反推祖先 scale，位移除以 scale | 正确，且比 #6108 更精确 |

Vue 3.5.28 起上游换了一版实现，是为了兼容 `skew`、非等比缩放等更复杂的情形，并在 scale 与 1 的差值小于 `0.01` 时跳过换算以避开抖动。**这份修复的思路被上游保留了，只是换成了更稳的实现。**

### 本库的处置

在上游吸收这份修复之前，本库内置了一份打过补丁的 `TransitionGroup` 副本（`src/scroll-list/Transition/`），以便在旧版 Vue 上也能得到正确动画。

既然修复已经进入 Vue 本体，这份副本**已删除**，`ScrollList` 改为直接使用 Vue 内置的 `TransitionGroup`。这样同时带来两个好处：

1. 不再依赖 `@vue/runtime-core`、`@vue/shared` 这两个内部包（它们此前被直接 import，却没有写进 `package.json`，靠提升（hoisting）侥幸解析）；
2. 自动获得上游的持续修正：Vue `>= 3.5.28` 是更精确的 scale 换算，之后的版本还陆续加入了「跳过 `v-show` 隐藏节点的位移计算」等边界修复。

代价是：在 Vue `3.0.0 ~ 3.5.22` 上，那份补丁不再随包发布，`ScrollList` 会回到 `getBoundingClientRect()` 的行为。

### 我应该怎么做

**情况一：可以升级 Vue（推荐）**

升级到 `>= 3.5.23` 即可，`>= 3.5.28` 更好。此时本库行为完整，且不再需要组件库兜底。

```bash
npm i vue@latest
```

**情况二：暂时只能停在 Vue 3.2.x / 3.4.x**

两个选择：

- 继续使用**旧版本组件库**（`obsession-ui@1.1.15` 及更早），它们内置补丁版 `TransitionGroup`，在旧 Vue 上动画同样正确；
- 或升级组件库，接受 `ScrollList` 在 `transform: scale` 容器中的位移动画异常 —— 如果你的页面里并没有对 `ScrollList` 的祖先做缩放，这个差异**完全不会出现**。

### 如何自检

先确认当前 Vue 版本：

```bash
npm ls vue
```

或在代码里打印：

```js
import { version } from 'vue'
console.log(version)
```

再判断是否真的会受影响。这个降级**只在同时满足以下两条**时才会出现：

1. 你的页面用到了 `ScrollList` 组件；
2. `ScrollList` 的某个祖先元素上带有 `transform: scale()`（例如整体缩放的自适应布局、大屏适配、视频播放器横竖屏缩放等）。

如果第二条不成立，无论 Vue 是什么版本，都无需关心这个差异。

### 附：如何验证修复是否已进入你使用的 Vue

`TransitionGroup` 的实现位于 `@vue/runtime-dom`。直接对已安装的发行版做一次特征扫描即可：

```bash
grep -o "offsetLeft\|scaleX" node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js | sort | uniq -c
```

对照输出判断：

| 输出 | 对应的 Vue 版本区间 | 测量方式 |
| --- | --- | --- |
| 无输出 | `<= 3.5.22` | `getBoundingClientRect()`，无 scale 处理 |
| `offsetLeft` | `3.5.23 ~ 3.5.27` | PR #6108 的方案 |
| `scaleX` | `>= 3.5.28` | 元素 rect + 祖先 scale 反推 |

如果你手上有一份 Vue 源码仓库，则对应文件是：

```bash
grep -n "offsetLeft\|scaleX" packages/runtime-dom/src/components/TransitionGroup.ts
```
