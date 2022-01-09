<template>
    <o-x-scroll :delta="width => width / 2" smooth>
        <o-menu :list="new Array(50).fill('菜单').map((text, index) => {
            return {
                index,
                title: `${text}_${index}`
            }
        })" />
    </o-x-scroll>
</template>

<style lang="scss" scoped>
.o-menu {
    max-width: auto;
    overflow: visible;
    :deep(.o-menu-item) {
        width: 10%;
    }
}
</style>