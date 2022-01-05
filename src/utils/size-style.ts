import {
    type CSSProperties
} from 'vue'

export const isNumeric = (value?: number | string) => !isNaN(Number(value))

export function addUnit(value?: string | number): string | undefined {
    if (typeof value !== 'undefined') {
        return isNumeric(value) ? `${value}px` : String(value)
    }
    return undefined
}

export function getSizeStyle(
    originSize?: string | number
): CSSProperties | undefined {
    if (typeof originSize !== 'undefined') {
        const size = addUnit(originSize)
        return {
            width: size,
            height: size,
        }
    }
}