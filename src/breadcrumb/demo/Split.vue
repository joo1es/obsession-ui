<template>
    <o-space vertical>
        <o-breadcrumb :list="[
            {
                index: '1',
                title: '首页',
                to: '/'
            },
            {
                index: '2',
                title: '当前页'
            }
        ]">
            <template #separator>
                ~
            </template>
        </o-breadcrumb>
        <o-breadcrumb :list="[
            {
                index: '1',
                title: '首页'
            },
            {
                index: '2',
                title: '当前页'
            }
        ]">
            <template #item="{ index, title }">
                {{ index }} is {{ title }}
            </template>
            <template #separator>
                ~
            </template>
        </o-breadcrumb>
    </o-space>
</template>