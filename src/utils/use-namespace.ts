const prefix = 'o'
export const useNamespace = (name: string) => {
    const basic = `${prefix}-${name}`
    return {
        basic,
        of: (of: string, prefix?: string) => `${prefix ?? basic}-${of}`,
        is: (is: string, prefix?: string) => `${prefix ?? basic}--${is}`
    }
}
