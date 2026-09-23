# 快速上手

### 版本要求（升级前必读）

**安装前请先确认你项目里的 Vue 版本。**

| 你的 Vue 版本 | 是否建议升级本库 |
| --- | --- |
| `>= 3.5.23` | 建议，行为完整 |
| `3.0.0 ~ 3.5.22` | 可以升级，但有**一处动画降级**，见下 |
| `< 3.0.0` | 不支持（本库是 Vue 3 组件库） |

如果你的项目停留在 Vue `3.0.0 ~ 3.5.22`：

- 功能不受影响，可以正常安装使用；
- 唯一的差异是 `ScrollList` 在带 `transform: scale()` 的祖先容器中，位移动画会异常；
- **若暂时无法升级 Vue，请停留在 `obsession-ui@1.1.15` 及更早版本**，这些版本内置了打过补丁的 `TransitionGroup`，旧版 Vue 上动画同样正确。

本库 `peerDependencies` 为 `vue: ^3.0.0`，**安装阶段不会报版本冲突**，所以上表第二行只能靠使用者自行判断。完整背景与版本对照见「开发指南 → Vue 版本兼容」。

### 安装

```bash
# 通过 npm 安装
npm i obsession-ui -S

# 通过 yarn 安装
yarn add obsession-ui
```

> 本库的 `Breadcrumb` 组件依赖 `vue-router`（已声明为 peer 依赖）。即使不使用该组件也不影响安装，但包管理器可能给出未安装 peer 依赖的提示。

### 引入组件

#### 方式一. babel-plugin-import 自动按需引入组件

##### 使用 Vite 构建的项目

```bash
# 安装 vite-plugin-style-import 插件
# 通过 npm 安装
npm i vite-plugin-style-import -D

# 通过 yarn 安装
yarn add vite-plugin-style-import -D
```

```js
// 配置 vite.config.ts/js
import styleImport from 'vite-plugin-style-import'
import autoImportIgnore from 'obsession-ui/lib/autoImportIgnore'
export default defineConfig({
    ...
    plugins: [
        styleImport({
            libs: [
                {
                    libraryName: 'obsession-ui',
                    esModule: true,
                    resolveStyle: (name) => {
                        if (autoImportIgnore.includes(name)) return
                        return `${name}/style/index.js`
                    }
                }
            ]
        }),
    ]
    ...
})
```

##### 使用 Vue-cli 构建的项目

```js
// 在.babelrc 中添加配置
// 注意：webpack 1 无需设置 libraryDirectory
{
    "plugins": [
        ["import", {
            "libraryName": "obsession-ui",
            "libraryDirectory": "es",
            "style": true
        }]
    ]
}

// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
module.exports = {
    plugins: [
        ['import', {
            libraryName: 'obsession-ui',
            libraryDirectory: 'es',
            style: true
        }, 'obsession-ui']
    ]
}
```

配置完成后，可在代码中直接引入 Obsession 组件而无需引入 css

```js
import { Space } from 'obsession-ui'
```

#### 方式二. 导入所有组件

```js
import Vue from 'vue'
import Obsession from 'obsession-ui'
import 'obsession-ui/lib/index.css'

Vue.use(Obsession)
```

```json
// 另外，使用 Volar 的朋友请在 tsconfig.json 中配置，以获得全局的类型提示
"compilerOptions": {
    "types": [
        "obsession-ui/lib/global"
    ]
}
```
