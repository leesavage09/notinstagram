import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Transformations } from '../util/image'
import * as ImageSelector from '../redux/selectors/image_selector'
import * as ImageActions from '../redux/actions/image_actions'
import { presetsMapping, applyPresetOnCanvas } from 'instagram-filters';

export default function ImageEditor(props) {
    const dispatch = useDispatch();
    const myCanvas = React.useRef();
    const container = React.useRef();
    const selectedImage = useSelector(state => ImageSelector.selectedImage(state))
    const { fitWidth, rotation, filter } = useSelector(state => ImageSelector.imageProcesses(state))

    React.useEffect(() => {
        if (selectedImage) save()
        else {
            const myImage = new Image(200, 200);
            myImage.src = `${imagePath()}/filters/Normal.jpg`;
            myImage.onload = () => {
                dispatch(ImageActions.imageSelectSuccess(myImage))
            }
        }
    })

    const fit = () => {
        dispatch(ImageActions.updateImageFilters({ fitWidth: !fitWidth }))
    }

    const rotate = () => {
        dispatch(ImageActions.updateImageFilters({ rotation: rotation + 90 }))
    }

    const save = () => {
        let tempImage = selectedImage
        tempImage = Transformations.rotateImg(tempImage, rotation)
        tempImage = fitWidth ? Transformations.cropFitToSquareImg(tempImage) : tempImage
        tempImage = Transformations.cropImageBetweenRatios(tempImage, (4 / 5), (16 / 9))
        tempImage = Transformations.scaleImg(tempImage, props.maxRes)
        if (filter && filter !== 'Normal') applyPresetOnCanvas(tempImage, presetsMapping[filter]())
        const displayImage = Transformations.centerImg(tempImage, 400)

        myCanvas.current.width = 400
        myCanvas.current.height = 400
        myCanvas.current.getContext("2d").drawImage(displayImage, 0, 0);

        dispatch(ImageActions.imageSavedSuccess(tempImage))
    }

    const filterButtons = []
    const allowedFilters = ['Normal', 'Clarendon', 'Gingham', 'Moon', 'Lark', 'Reyes', 'Juno', 'Slumber', 'Crema', 'Ludwig', 'Aden', 'Perpetua']
    allowedFilters.forEach((name) => {
        filterButtons.push(
            <FilterButton key={name} type={name} selected={filter === name} />
        )
    })

    return (
        <div ref={container} className="edit-mode">
            <div className="image-editor">
                <canvas className="image-editor__canvas" ref={myCanvas} />
                <a className="image-editor__fit-button image-fit" onClick={fit} />
                <a className="image-editor__rotate-button image-rotate" onClick={rotate} />
            </div>

            <div className='filter-buttons'>
                {filterButtons}
            </div>

            <div className='image-editor-options'>
                <button
                    className='image-editor-options__filter ghost-button'
                    onClick={() => {
                        container.current.className = "filter-mode"
                    }}
                >
                    Filter
                </button>
                <button
                    className='image-editor-options__edit ghost-button'
                    onClick={() => {
                        container.current.className = "edit-mode"
                    }}
                >
                    Edit
                </button>
            </div>
        </div>
    );
}


function FilterButton(props) {
    const dispatch = useDispatch();
    const imgSrc = `${imagePath()}/filters/${props.type}.jpg`
    const cName = props.selected ? 'filter-buttons__text filter-buttons__text--selected' : 'filter-buttons__text'
    return (
        <a
            className="filter-buttons__button"
            onClick={() => {
                dispatch(ImageActions.updateImageFilters({ filter: props.type }))
            }}>
            <span className={cName}>
                {props.type}
            </span>
            <img className="filter-buttons__image"
                src={imgSrc}
            />
        </a>
    );
}

function imagePath() {
    return process.env.NODE_ENV === 'production' ? process.env.STATIC_RESOURCES : ''
}