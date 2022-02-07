<template>
    <o-data-pagination
        :layout="['custom', 'prev', 'custom2', 'next']"
        :total="300"
    >
        <template #custom>
            自定义插槽可以叫任何名字，也可以放任何内容
        </template>
        <template #prev="{ disabled, click }">
            <o-button text style="font-size: 13px; padding: 0 5px;" :disabled="disabled" @click="click">
                上一页
            </o-button>
        </template>
        <template #custom2="{ page, size }">
            {{ page }} / {{ size }}
        </template>
        <template #next="{ disabled, click }">
            <o-button text style="font-size: 13px; padding: 0 5px;" :disabled="disabled" @click="click">
                下一页
            </o-button>
        </template>
    </o-data-pagination>
</template>