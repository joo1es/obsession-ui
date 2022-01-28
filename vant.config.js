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
                    {
                        path: 'virtual-list',
                        title: 'VirtualList 虚拟列表'
                    }
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
                    {
                        path: 'layout',
                        title: 'Layout 布局',
                    }
                ],
            },
            {
                title: '输入组件',
                items: [
                    {
                        path: 'checkbox',
                        title: 'Checkbox 多选框'
                    },
                    {
                        path: 'radio',
                        title: 'Radio 单选框'
                    },
                    {
                        path: 'tag-input',
                        title: 'TagInput 标签输入'
                    },
                    {
                        path: 'upload',
                        title: 'Upload 上传'
                    },
                    {
                        path: 'tree',
                        title: 'Tree 树'
                    }
                ]
            },
            {
                title: '展示组件',
                items: [
                    {
                        path: 'table',
                        title: 'Table 表格'
                    },
                    {
                        path: 'pagination',
                        title: 'Pagination 分页'
                    },
                    {
                        path: 'avatar',
                        title: 'Avatar 头像',
                    },
                    {
                        path: 'image',
                        title: 'Image 图片',
                    },
                    {
                        path: 'breadcrumb',
                        title: 'Breadcrumb 面包屑',
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
                        path: 'progress',
                        title: 'Progress 进度条',
                    },
                    {
                        path: 'tooltip',
                        title: 'Tooltip 文字提示',
                    },
                    {
                        path: 'omit',
                        title: 'Omit 省略',
                    },
                    {
                        path: 'ellipsis',
                        title: 'Ellipsis 文本省略',
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
            {
                title: '业务组件',
                items: [
                    {
                        path: 'scroll-list',
                        title: 'ScrollList 滚动列表',
                    },
                    {
                        path: 'count-to',
                        title: 'CountTo 数值动画'
                    },
                    {
                        path: 'statistic',
                        title: 'Statistic 统计数据',
                    },
                    {
                        path: 'pop-dialog',
                        title: 'PopDialog 气泡对话'
                    },
                    {
                        path: 'x-scroll',
                        title: 'XScroll 横向滚动',
                    },
                    {
                        path: 'comment',
                        title: 'Comment 评论',
                    }
                ]
            }
        ],
    },
}
