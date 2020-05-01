import React from 'react';
import { Transformations } from '../util/image'

export default function ImageEditor(props) {
    const myCanvas = React.useRef();
    const originalImage = props.img
    let newImage
    const saveImageCallback = props.saveImage
    let fitWidth = false;
    let rotation = 0

    React.useEffect(() => { if (originalImage) save() })

    const fit = () => {
        fitWidth = !fitWidth
        save();
    }

    const rotate = () => {
        rotation = rotation + 90
        save();
    }

    const save = () => {
        let tempImage = originalImage
        tempImage = Transformations.rotateImg(tempImage, rotation)
        tempImage = fitWidth ? Transformations.cropFitToSquareImg(tempImage) : tempImage
        tempImage = Transformations.cropImageBetweenRatios(tempImage, (4 / 5), (16 / 9))
        newImage = Transformations.scaleImg(tempImage, 1080)
        const displayImage = Transformations.centerImg(newImage, 400)

        myCanvas.current.width = 400
        myCanvas.current.height = 400
        myCanvas.current.getContext("2d").drawImage(displayImage, 0, 0);
    }

    const saveCallback = () => {
        saveImageCallback(newImage.toDataURL("image/jpeg"))
    }

    return (
        <div>
            <canvas className="imageEditor" ref={myCanvas} />

            <button onClick={fit}>Fit</button>
            <button onClick={rotate}>Rotate</button>
            <button onClick={saveCallback}>Save</button>
        </div>
    );
}
