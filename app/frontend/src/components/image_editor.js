import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Transformations } from '../util/image'
import * as ImageSelector from '../redux/selectors/component/image_selector'
import * as ImageActions from '../redux/actions/component/image_actions'
import { presetsMapping, applyPresetOnCanvas } from 'instagram-filters';
import {imagePath} from '../util/helpers'

export default function ImageEditor(props) {
    const dispatch = useDispatch();
    const myCanvas = React.useRef();
    const container = React.useRef();
    const selectedImage = useSelector(ImageSelector.selectedImage())
    const { fitWidth: selectedFitWidth, rotation: selectedRotation, filter: selectedFilter } = useSelector(ImageSelector.imageProcesses())
    const fitWidth = props.forceSquareImage ? true : selectedFitWidth

    React.useEffect(() => {
        if (selectedImage) save()
        else { //TODO remove after testing //for dev only
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
        dispatch(ImageActions.updateImageFilters({ rotation: selectedRotation + 90 }))
    }

    const save = () => {
        let tempImage = selectedImage
        tempImage = Transformations.rotateImg(tempImage, selectedRotation)
        tempImage = fitWidth ? Transformations.cropFitToSquareImg(tempImage) : tempImage
        tempImage = Transformations.cropImageBetweenRatios(tempImage, (4 / 5), (16 / 9))
        tempImage = Transformations.scaleImg(tempImage, props.maxRes)
        if (selectedFilter && selectedFilter !== 'Normal') applyPresetOnCanvas(tempImage, presetsMapping[selectedFilter]())
        const displayImage = Transformations.centerImg(tempImage, 400)

        myCanvas.current.width = 400
        myCanvas.current.height = 400
        myCanvas.current.getContext("2d").drawImage(displayImage, 0, 0);

        dispatch(ImageActions.imageSavedSuccess(tempImage))
    }

    const fitButton = props.forceSquareImage ?
        '' : <a className="image-editor__fit-button image-fit" onClick={fit} />


    return (
        <div ref={container} className="edit-mode">
            <div className="image-editor">
                <canvas className="image-editor__canvas" ref={myCanvas} />
                {fitButton}
                <a className="image-editor__rotate-button image-rotate" onClick={rotate} />
            </div>

            <div className='filter-buttons'>
                {getAllowedFilterButtons(selectedFilter)}
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

function getAllowedFilterButtons(selectedFilter) {
    const filterButtons = []
    const allowedFilters = ['Normal', 'Clarendon', 'Gingham', 'Moon', 'Lark', 'Reyes', 'Juno', 'Slumber', 'Crema', 'Ludwig', 'Aden', 'Perpetua']
    allowedFilters.forEach((filterName) => {
        filterButtons.push(
            <FilterButton key={filterName} filterName={filterName} isSelected={selectedFilter === filterName} />
        )
    })

    return filterButtons;
}

function FilterButton(props) {
    const dispatch = useDispatch();
    const imgSrc = `${imagePath()}/filters/${props.filterName}.jpg`
    const cName = props.isSelected ? 'filter-buttons__text filter-buttons__text--selected' : 'filter-buttons__text'
    return (
        <a
            className="filter-buttons__button"
            onClick={() => {
                dispatch(ImageActions.updateImageFilters({ filter: props.filterName }))
            }}>
            <span className={cName}>
                {props.filterName}
            </span>
            <img className="filter-buttons__image"
                src={imgSrc}
            />
        </a>
    );
}