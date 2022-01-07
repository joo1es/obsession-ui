<template>
    <div
        :class="{
            'o-tree-node': true,
            'o-tree-node__disabled': disabled
        }"
        @click="() => {
            if (isNoChildren) return
            const index = expends.indexOf(keyIs)
            emits('expend', index > -1, keyIs, level)
        }"
    >
        <div class='o-tree-node__indent'>
            <div v-for="lv in levels" class='o-tree-node__indent-cell' :keyIs="lv" />
        </div>
        <div class='o-tree-node__title'>
            <div class="o-tree-node__arrow">
                <Icon v-if="!isNoChildren" ref="icon" :class="{ 'expend': expending }">
                    <CaretForward />
                </Icon>
            </div>
            <div class="o-tree-node__content">
                <Checkbox
                    :disabled="disabled"
                    :model-value="checkedStatus === 1"
                    :indeterminate="checkedStatus === 0"
                    @click.stop
                    @update:model-value="value => {
                        if (disabled) return
                        if (!children) {
                            const index = checkedList.indexOf(keyIs)
                            if (value) {
                                if (index > -1) return
                                checkedList.push(keyIs)
                            } else {
                                checkedList.splice(index, 1)
                            }
                        } else {
                            emits('setChecked', value, children)
                        }
                    }"
                />
                <slot v-bind="list">
                    {{ title || keyIs }}
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import Icon from '../icon'
import { CaretForward } from '@vicons/ionicons5'
import Checkbox from '../checkbox'

import type { TreeListItemCustom, ExpendsList } from './interface'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
    keyIs: string | number | symbol,
    title: string,
    level: number,
    expends: (string | number | symbol)[],
    modelValue: (string | number | symbol)[],
    disabled: boolean,
    list: TreeListItemCustom,
    getChecked: (list: TreeListItemCustom) => -1 | -2 | 0 | 1,
    children?: TreeListItemCustom[],
    expendsList: ExpendsList[],
    parent: TreeListItemCustom
}>()

const emits = defineEmits<{
    (e: 'setChecked', value: boolean, children: TreeListItemCustom[]): void,
    (e: 'expend', isDelete: boolean, key: string | number | symbol, level: number): void,
    (e: 'update:modelValue', value: (string | number | symbol)[]): void
}>()

const checkedList = useVModel(props, 'modelValue', emits, {
    passive: true,
    deep: true
})

const levels = computed(() => new Array(props.level))

const icon = ref()

const expending = computed(() => props.expends.includes(props.keyIs) || props.expendsList.find(item => !item.isDelete && item.keyIs === props.keyIs))
const checkedStatus = computed(() => props.getChecked(props.list))
const disabled = computed(() => props.disabled || checkedStatus.value === -2)
const isNoChildren = computed(() => !props.children || props.children.length === 0)
</script>
