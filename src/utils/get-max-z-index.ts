const getMaxZIndex = () => {
    const elements = Array.from(document.querySelectorAll('*'))
    const arr = elements.map(e => +window.getComputedStyle(e).zIndex || 0)
    return arr.length ? Math.max(...arr) + 1 : 1
}

export { getMaxZIndex }