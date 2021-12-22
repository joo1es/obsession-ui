<template>
    <o-pop-confirm title="提示" :confirm-props="{ type: 'danger' }">
        <template #target>
            <o-button type="danger">删除</o-button>
        </template>
        真的要删除吗？
    </o-pop-confirm>
</template>