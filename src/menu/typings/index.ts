import type { Component } from 'vue'
import type { CollapseSupport } from '../../collapse'

export interface MenuRecord {
    index: CollapseSupport,
    title?: string,
    icon?: Component,
    disabled?: boolean,
    children?: MenuRecord[]
}
export type MenuList = MenuRecord[]