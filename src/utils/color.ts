/**
 * Minimal local replacement for `@ctrl/tinycolor`.
 *
 * The obsession-ui <o-button> only ever used TinyColor to derive four hover /
 * active shades from the button's main color:
 *   - brighten(10)  -> --o-button-color--light
 *   - darken(10)    -> --o-button-color--dark
 *   - lighten(30)   -> --o-button-color--lighting
 *   - lighten(40)   -> --o-button-color--lighten
 *
 * This file reproduces those four operations **byte-for-byte** for the color
 * formats this design system actually feeds in (hex 3/4/6/8, rgb()/rgba(),
 * hsl()/hsla(), hsv()/hsva()). It intentionally does not implement the rest of
 * TinyColor (readability, mix, polyad, named colors, ...) in order to drop the
 * ~22 KB dependency. Any unrecognized input falls back to returning the source
 * color unchanged for every shade, so the component never crashes.
 */

// ---------------------------------------------------------------------------
// helpers (ported verbatim from @ctrl/tinycolor internals)
// ---------------------------------------------------------------------------

function isOnePointZero(n: string): boolean {
    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1
}

function isPercentage(n: string): boolean {
    return typeof n === 'string' && n.indexOf('%') !== -1
}

function bound01(n: number | string, max: number): number {
    if (isOnePointZero(n as string)) {
        n = '100%'
    }
    const isPercent = isPercentage(n as string)
    n = max === 360 ? (n as number) : Math.min(max, Math.max(0, parseFloat(n as string)))
    if (isPercent) {
        n = parseInt(String((n as number) * max), 10) / 100
    }
    if (Math.abs((n as number) - max) < 0.000001) {
        return 1
    }
    if (max === 360) {
        n = ((n as number) < 0 ? ((n as number) % max) + max : (n as number) % max) / max
    } else {
        n = ((n as number) % max) / max
    }
    return n as number
}

function clamp01(val: number): number {
    return Math.min(1, Math.max(0, val))
}

function boundAlpha(a: number | string): number {
    a = parseFloat(a as string)
    if (isNaN(a) || a < 0 || a > 1) {
        a = 1
    }
    return a
}

function convertToPercentage(n: number | string): string {
    if (Number(n) <= 1) {
        return Number(n) * 100 + '%'
    }
    return String(n)
}

function pad2(c: string): string {
    return c.length === 1 ? '0' + c : c
}

function parseIntFromHex(val: string): number {
    return parseInt(val, 16)
}

function rgbToRgb(r: number | string, g: number | string, b: number | string) {
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255,
    }
}

function rgbToHsl(r: number, g: number, b: number) {
    r = bound01(r, 255)
    g = bound01(g, 255)
    b = bound01(b, 255)
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2
    if (max === min) {
        h = 0
        s = 0
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }
    return { h, s, l }
}

function hue2rgb(p: number, q: number, t: number): number {
    if (t < 0) {
        t += 1
    }
    if (t > 1) {
        t -= 1
    }
    if (t < 1 / 6) {
        return p + (q - p) * (6 * t)
    }
    if (t < 1 / 2) {
        return q
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6
    }
    return p
}

function hslToRgb(h: number | string, s: number | string, l: number | string) {
    h = bound01(h, 360)
    s = bound01(s, 100)
    l = bound01(l, 100)
    let r: number
    let g: number
    let b: number
    if (s === 0) {
        r = l
        g = l
        b = l
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }
    return { r: r * 255, g: g * 255, b: b * 255 }
}

function hsvToRgb(h: number | string, s: number | string, v: number | string) {
    h = bound01(h, 360) * 6
    s = bound01(s, 100)
    v = bound01(v, 100)
    const i = Math.floor(h)
    const f = h - i
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)
    const mod = i % 6
    const r = [v, q, p, p, t, v][mod]
    const g = [t, v, v, q, p, p][mod]
    const b = [p, p, t, v, v, q][mod]
    return { r: r * 255, g: g * 255, b: b * 255 }
}

function rgbToHex(r: number, g: number, b: number): string {
    const hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
    ]
    return hex.join('')
}

// ---------------------------------------------------------------------------
// parsing (hex / rgb / rgba / hsl / hsla / hsv / hsva) — no named colors
// ---------------------------------------------------------------------------

const CSS_INTEGER = '[-\\+]?\\d+%?'
const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'
const CSS_UNIT = '(?:' + CSS_NUMBER + ')|(?:' + CSS_INTEGER + ')'
const PERMISSIVE_MATCH3 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?'
const PERMISSIVE_MATCH4 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?'

const matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
    rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
    hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
    hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
    hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
    hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
}

function isValidCSSUnit(n: any): boolean {
    return Boolean(matchers.CSS_UNIT.exec(String(n)))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stringInputToObject(color: string): any {
    color = color.trim().toLowerCase()
    if (color.length === 0) {
        return false
    }
    if (color === 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0 }
    }
    let match: RegExpExecArray | null
    match = matchers.rgb.exec(color)
    if (match) {
        return { r: match[1], g: match[2], b: match[3] }
    }
    match = matchers.rgba.exec(color)
    if (match) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] }
    }
    match = matchers.hsl.exec(color)
    if (match) {
        return { h: match[1], s: match[2], l: match[3] }
    }
    match = matchers.hsla.exec(color)
    if (match) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] }
    }
    match = matchers.hsv.exec(color)
    if (match) {
        return { h: match[1], s: match[2], v: match[3] }
    }
    match = matchers.hsva.exec(color)
    if (match) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] }
    }
    match = matchers.hex8.exec(color)
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: parseIntFromHex(match[4] + match[4]) / 255,
        }
    }
    match = matchers.hex6.exec(color)
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
        }
    }
    match = matchers.hex4.exec(color)
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            a: parseIntFromHex(match[4] + match[4]) / 255,
        }
    }
    match = matchers.hex3.exec(color)
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
        }
    }
    return false
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function inputToRGB(color: string): any {
    let rgb = { r: 0, g: 0, b: 0 }
    let a = 1
    let ok = false
    const c: any = stringInputToObject(color)
    if (c && typeof c === 'object') {
        if (isValidCSSUnit(c.r) && isValidCSSUnit(c.g) && isValidCSSUnit(c.b)) {
            rgb = rgbToRgb(c.r, c.g, c.b)
            ok = true
        } else if (isValidCSSUnit(c.h) && isValidCSSUnit(c.s) && isValidCSSUnit(c.v)) {
            const s = convertToPercentage(c.s)
            const v = convertToPercentage(c.v)
            rgb = hsvToRgb(c.h, s, v)
            ok = true
        } else if (isValidCSSUnit(c.h) && isValidCSSUnit(c.s) && isValidCSSUnit(c.l)) {
            const s = convertToPercentage(c.s)
            const l = convertToPercentage(c.l)
            rgb = hslToRgb(c.h, s, l)
            ok = true
        }
        if (Object.prototype.hasOwnProperty.call(c, 'a')) {
            ;({ a } = c)
        }
    }
    a = boundAlpha(a)
    return {
        ok,
        r: Math.min(255, Math.max(rgb.r, 0)),
        g: Math.min(255, Math.max(rgb.g, 0)),
        b: Math.min(255, Math.max(rgb.b, 0)),
        a,
    }
}

// ---------------------------------------------------------------------------
// drop-in TinyColor (only the methods <o-button> uses)
// ---------------------------------------------------------------------------

export class TinyColor {
    r: number

    g: number

    b: number

    a: number

    ok: boolean

    constructor(color: string) {
        const rgb = inputToRGB(color)
        this.r = rgb.r
        this.g = rgb.g
        this.b = rgb.b
        this.a = rgb.a
        this.ok = rgb.ok
        // mirror the real constructor's <1 rounding
        if (this.r < 1) {
            this.r = Math.round(this.r)
        }
        if (this.g < 1) {
            this.g = Math.round(this.g)
        }
        if (this.b < 1) {
            this.b = Math.round(this.b)
        }
    }

    toRgb() {
        return {
            r: Math.round(this.r),
            g: Math.round(this.g),
            b: Math.round(this.b),
        }
    }

    toHsl() {
        const hsl = rgbToHsl(this.r, this.g, this.b)
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l }
    }

    toHexString(): string {
        return '#' + rgbToHex(this.r, this.g, this.b)
    }

    brighten(amount = 10): TinyColor {
        const rgb = this.toRgb()
        const shift = Math.round(255 * -(amount / 100))
        return TinyColor.fromRgb(
            Math.max(0, Math.min(255, rgb.r - shift)),
            Math.max(0, Math.min(255, rgb.g - shift)),
            Math.max(0, Math.min(255, rgb.b - shift)),
            this.a
        )
    }

    darken(amount = 10): TinyColor {
        const hsl = this.toHsl()
        const l = clamp01(hsl.l - amount / 100)
        return TinyColor.fromHsl(hsl.h, hsl.s, l, this.a)
    }

    lighten(amount = 10): TinyColor {
        const hsl = this.toHsl()
        const l = clamp01(hsl.l + amount / 100)
        return TinyColor.fromHsl(hsl.h, hsl.s, l, this.a)
    }

    static fromRgb(r: number, g: number, b: number, a = 1): TinyColor {
        const c = new TinyColor('')
        c.r = r
        c.g = g
        c.b = b
        c.a = a
        c.ok = true
        return c
    }

    static fromHsl(h: number, s: number, l: number, a = 1): TinyColor {
        const rgb = hslToRgb(h, convertToPercentage(s), convertToPercentage(l))
        const c = new TinyColor('')
        c.r = rgb.r
        c.g = rgb.g
        c.b = rgb.b
        c.a = a
        c.ok = true
        return c
    }
}

export default TinyColor
