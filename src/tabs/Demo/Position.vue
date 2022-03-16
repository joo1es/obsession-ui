<template>
    <o-space vertical>
        <o-tabs position="bottom">
            <o-tab title="test">
                内容
            </o-tab>
            <o-tab title="test2">
                内容2
            </o-tab>
            <o-tab title="test">
                <template #title>
                    插槽
                </template>
                内容3
            </o-tab>
        </o-tabs>
        <o-tabs position="left">
            <o-tab title="test">
                内容
            </o-tab>
            <o-tab title="test2" disabled>
                内容2
            </o-tab>
            <o-tab title="test">
                <template #title>
                    插槽
                </template>
                内容3
            </o-tab>
        </o-tabs>
        <o-tabs position="right">
            <o-tab title="test">
                内容
            </o-tab>
            <o-tab title="test2">
                内容2
            </o-tab>
            <o-tab title="test">
                <template #title>
                    插槽
                </template>
                内容3
            </o-tab>
        </o-tabs>
    </o-space>
</template>
