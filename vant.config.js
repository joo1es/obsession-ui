module.exports = {
    name: 'obsession-ui',
    build: {
        css: {
            preprocessor: 'sass',
        },
        site: {
            publicPath: '/obsession-ui/',
        },
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
                }
            ],
        },
        {
            title: '布局组件',
            items: [
                {
                    path: 'space',
                    title: 'Space 空间'
                },
            ],
        },
        ],
    },
};
