<template>
    <o-tabs closable card>
        <o-tab title="首页" :closable="false">
            首页
        </o-tab>
        <o-tab title="测试页面1">
            测试页面1
        </o-tab>
        <o-tab>
            <template #title>
                测试页面2
            </template>
            测试页面2
        </o-tab>
        <o-tab>
            <template #title>
                这个标题很长所以需要耐心的看
            </template>
            这个标题很长所以需要耐心的看
        </o-tab>
    </o-tabs>
</template>