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
                    {
                        path: 'toast',
                        title: 'Toast 吐司提示',
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
                title: '输入组件',
                items: [
                    {
                        path: 'tag-input',
                        title: 'TagInput 标签输入'
                    }
                ]
            },
            {
                title: '展示组件',
                items: [
                    {
                        path: 'avatar',
                        title: 'Avatar 头像',
                    },
                    {
                        path: 'tag',
                        title: 'Tag 标签',
                    },
                    {
                        path: 'menu',
                        title: 'Menu 菜单',
                    },
                    {
                        path: 'dropdown',
                        title: 'Dropdown 下拉菜单',
                    },
                    {
                        path: 'action-sheet',
                        title: 'ActionSheet 动作菜单',
                    },
                    {
                        path: 'popover',
                        title: 'Popover 气泡弹出框',
                    },
                    {
                        path: 'pop-confirm',
                        title: 'PopConfirm 气泡弹出框',
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
                        title: 'ScrollList 滚动列表',
                    },
                    {
                        path: 'statistic',
                        title: 'Statistic 统计数据',
                    },
                    {
                        path: 'overlay',
                        title: 'Overlay 遮罩',
                    },
                    {
                        path: 'modal',
                        title: 'Modal 模态框',
                    },
                    {
                        path: 'badge',
                        title: 'Badge 徽章',
                    }
                ],
            },
        ],
    },
}
