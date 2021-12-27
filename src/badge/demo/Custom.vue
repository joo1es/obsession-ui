<template>
    <o-space align="center">
        <o-badge value="任意字符串" />
        <o-badge value="任意背景" color="#eee" style="--o-badge-color: #333; --o-badge-font-size: 12px;" />
        <o-badge style="--o-badge-font-size: 14px;" color="#469">
            <template #value>
                插槽
            </template>
            <o-button>更多</o-button>
        </o-badge>
    </o-space>
</template>