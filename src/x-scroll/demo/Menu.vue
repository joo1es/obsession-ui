<template>
    <o-x-scroll smooth>
        <o-menu :list="new Array(30).fill('菜单').map((text, index) => {
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
}
</style>