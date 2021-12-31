export function getFirstLetter(content: string) {
    if (!content) return ''
    return Array.from(content)[0]
}