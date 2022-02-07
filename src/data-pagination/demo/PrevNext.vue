<template>
    <o-data-pagination
        :layout="['total', 'sizes', 'prev', 'pager', 'next', 'jumper']"
        :total="300"
    >
        <template #prev="{ disabled, click }">
            <o-button text style="font-size: 13px; padding: 0 5px;" :disabled="disabled" @click="click">
                上一页
            </o-button>
        </template>
        <template #next="{ disabled, click }">
            <o-button text style="font-size: 13px; padding: 0 5px;" :disabled="disabled" @click="click">
                下一页
            </o-button>
        </template>
    </o-data-pagination>
</template>