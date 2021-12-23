import type { Component } from 'vue'
import type { CollapseSupport } from '../../collapse'

export type MenuRecord = {
    index: CollapseSupport,
    title?: string,
    icon?: Component | string,
    disabled?: boolean,
    children?: MenuRecord[],
    info?: Record<string, any>,
    groupName?: string
}
export type MenuList = MenuRecord[]