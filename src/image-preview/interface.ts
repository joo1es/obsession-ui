export type PreviewImage = string | ({
    src: string,
    thumb?: string,
    element?: string | Element,
    live?: string,
    points?: {
        position: [number, number],
        size?: [number, number],
        description?: string
    }[]
} & Record<any, any>)