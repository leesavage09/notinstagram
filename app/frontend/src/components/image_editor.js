import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Transformations } from '../util/image'
import * as ImageSelector from '../redux/selectors/image_selector'
import * as ImageActions from '../redux/actions/image_actions'

export default function ImageEditor(props) {
    const dispatch = useDispatch();
    const myCanvas = React.useRef();
    const selectedImage = useSelector(state => ImageSelector.selectedImage(state))
    const {fitWidth,rotation} = useSelector(state => ImageSelector.imageProcesses(state))

    React.useEffect(() => { if (selectedImage) save() })

    const fit = () => {
        dispatch(ImageActions.updateImageFilters({fitWidth: !fitWidth}))
    }

    const rotate = () => {
        dispatch(ImageActions.updateImageFilters({rotation: rotation + 90}))
    }

    const save = () => {
        let tempImage = selectedImage
        tempImage = Transformations.rotateImg(tempImage, rotation)
        tempImage = fitWidth ? Transformations.cropFitToSquareImg(tempImage) : tempImage
        tempImage = Transformations.cropImageBetweenRatios(tempImage, (4 / 5), (16 / 9))
        tempImage = Transformations.scaleImg(tempImage, props.maxRes)
        const displayImage = Transformations.centerImg(tempImage, 400)

        myCanvas.current.width = 400
        myCanvas.current.height = 400
        myCanvas.current.getContext("2d").drawImage(displayImage, 0, 0);

        dispatch(ImageActions.imageSavedSuccess(tempImage))
    }

    return (
        <div>
            <canvas className="imageEditor" ref={myCanvas} />
            <button onClick={fit}>Fit</button>
            <button onClick={rotate}>Rotate</button>
        </div>
    );
}
