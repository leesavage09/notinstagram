export function isRotated(rotation) {
    return rotation !== 0 || (rotation / 360) % 2 !== 1
}

export function isRotatedRightAngle(rotation) {
    return (rotation / 90) % 2 === 1
}

export function isLandscape(img) {
    return img.width > img.height
}

export function isPortrate(img) {
    return img.width < img.height
}

export function isSquare(img) {
    return img.width === img.height
}

export function aspectRatio(img) {
    return img.width / img.height
}

export function calcHeight(width, aspectRatio) {
    return width / aspectRatio
}

export function calcWidth(height, aspectRatio) {
    return height * aspectRatio
}