export const selectedImage = () => {
    return state => state.component.image.selected_image
}

export const processedImage = () => {
    return state => state.component.image.processed_image
}

export const imageProcesses = () => {
    return state => state.component.image.image_processes
}
