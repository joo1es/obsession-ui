<template>
    <o-tabs>
        <o-tab title="test" index="test">
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
</template>