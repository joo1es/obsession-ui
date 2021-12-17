module.exports = {
    name: 'obsession-ui',
    build: {
        css: {
            preprocessor: 'sass',
        },
        site: {
            publicPath: '/obsession-ui/',
        },
        namedExport: true
    },
    site: {
        title: 'obsession-ui',
        logo: 'https://img.yzcdn.cn/vant/logo.png',
        hideSimulator: true,
        nav: [
            {
                title: '开发指南',
                items: [
                    {
                        path: 'home',
                        title: '介绍',
                    },
                    {
                        path: 'quickstart',
                        title: '快速上手',
                    },
                ],
            },
            {
                title: '基础组件',
                items: [
                    {
                        path: 'icon',
                        title: 'Icon 图标',
                    },
                    {
                        path: 'button',
                        title: 'Button 按钮',
                    },
                    {
                        path: 'collapse-transition',
                        title: 'Transition 渐变',
                    },
                ],
            },
            {
                title: '布局组件',
                items: [
                    {
                        path: 'space',
                        title: 'Space 空间',
                    },
                    {
                        path: 'grid',
                        title: 'Grid 网格',
                    },
                    {
                        path: 'collapse',
                        title: 'Collapse 折叠面板',
                    },
                ],
            },
            {
                title: '展示组件',
                items: [
                    {
                        path: 'menu',
                        title: 'Menu 菜单',
                    },
                    {
                        path: 'popover',
                        title: 'Popover 气泡弹出框',
                    },
                    {
                        path: 'tooltip',
                        title: 'Tooltip 文字提示',
                    },
                    {
                        path: 'ellipsis',
                        title: 'Ellipsis 文本省略',
                    },
                    {
                        path: 'scroll-list',
                        title: 'Scroll List 滚动列表',
                    }
                ],
            },
        ],
    },
}
