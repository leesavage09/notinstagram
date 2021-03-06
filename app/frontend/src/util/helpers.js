

export function debounce(func, waitTime) {
    let timeout
    return () => {
        const context = this
        const args = arguments

        clearTimeout(timeout)

        if (waitTime === 0) {
            func.apply(context, args)
        }
        else {
            timeout = setTimeout(() => {
                timeout = null
                func.apply(context, args)
            }, waitTime)
        }
    }
}


export const imagePath = process.env.NODE_ENV === 'production' ? process.env.STATIC_RESOURCES : ''