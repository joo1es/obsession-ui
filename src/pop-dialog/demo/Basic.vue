<template>
    <o-space vertical style="background-color: #eee; padding: 20px;" :size="[0, 10]">
        <o-pop-dialog>
            你好啊我的老朋友
        </o-pop-dialog>
        <o-pop-dialog title="admin" right>
            你好
        </o-pop-dialog>
        <o-pop-dialog right>
            我可以往里放任何东西
        </o-pop-dialog>
        <o-pop-dialog style="--o-pop-dialog-padding: 0" right :arrow="false">
            <img src="https://avatars.githubusercontent.com/u/76929557?v=4" />
        </o-pop-dialog>
    </o-space>
</template>