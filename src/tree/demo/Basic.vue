<template>
    <o-tree :list="[
        {
            key: '1',
            title: '数字列表',
            children: [{
                key: '1-1',
                title: '1-1'
            }, {
                key: '1-2',
                title: '1-2',
                children: [{
                    key: '1-2-1',
                    title: '1-2-1'
                }, {
                    key: '1-2-2',
                    title: '1-2-2',
                    disabled: true
                }]
            }]
        }
    ]"/>
    <o-tree :list="[
        {
            key: '1',
            title: '数字列表',
            children: [{
                key: '1-1',
                title: '1-1'
            }, {
                key: '1-2',
                title: '1-2',
                children: [{
                    key: '1-2-1',
                    title: '1-2-1'
                }, {
                    key: '1-2-2',
                    title: '1-2-2',
                    disabled: true
                }]
            }]
        }
    ]" checkable/>
</template>