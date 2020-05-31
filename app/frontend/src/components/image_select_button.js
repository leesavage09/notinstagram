import React from 'react';
import { imageEditorActions } from '../redux/slice/image_editor_slice'
import { Utilitys } from '../util/image'
import { useDispatch } from 'react-redux'

export default function ImageSelectButton(props) {
    const dispatch = useDispatch()
    const fileInput = React.createRef()

    const fileSelected = () => {
        Utilitys.fetchImageFromFile(fileInput.current.files[0])
            .then(img => {
                dispatch(imageEditorActions.imageSelectSuccess(img))
                props.imageSelected()
            })
            .catch(e => {
                dispatch(imageEditorActions.imageSelectFailure(e))
            })
    }

    return (
        <a className={props.className} onClick={() => fileInput.current.click()}>
            {props.children}
            <input
                ref={fileInput}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={fileSelected}
            />
        </a>
    )
}