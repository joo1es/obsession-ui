<template>
    <o-space align="center">
        <o-badge />
        <o-badge :value="200" :max="99" />
        <o-badge :value="2">
            <o-button>更多</o-button>
        </o-badge>
        <o-badge>
            <o-button>更多</o-button>
        </o-badge>
        <o-badge value="任意字符串" />
    </o-space>
</template>