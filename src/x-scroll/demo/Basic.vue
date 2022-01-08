<template>
    <o-x-scroll>
        {{ new Array(3).fill('不滚动').join('') }}
    </o-x-scroll>
    <o-x-scroll>
        {{ new Array(50).fill('滚动').join('') }}
    </o-x-scroll>
</template>