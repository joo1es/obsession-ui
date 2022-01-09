<template>
    <o-x-scroll smooth>
        <o-space :wrap="false">
            <o-tag v-for="tag in 30" :key="tag" closable>
                标签 {{ tag }}
            </o-tag>
        </o-space>
    </o-x-scroll>
</template>