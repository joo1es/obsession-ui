<template>
    <o-space vertical style="background-color: #eee; padding: 20px;" :size="[0, 10]">
        <o-pop-dialog>
            你好啊我的老朋友
        </o-pop-dialog>
        <o-pop-dialog title="admin" right>
            你好
        </o-pop-dialog>
    </o-space>
</template>

<style lang="scss" scoped>
.o-pop-dialog {
    --o-pop-dialog-right-color: #000;
    --o-pop-dialog-right-bg: #9eea6a;
    --o-pop-dialog-right-active-bg: #98e165;
    --o-pop-dialog-arrow-size: 6px;
    --o-pop-dialog-border-radius: 4px;
}
</style>