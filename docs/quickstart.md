# 快速上手

### 安装

```bash
# 通过 npm 安装
npm i obsession-ui -S

# 通过 yarn 安装
yarn add obsession-ui
```

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
