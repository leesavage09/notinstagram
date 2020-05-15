import React from 'react';
import { imageSelectSuccess, imageSelectFailure } from '../redux/actions/image_actions'
import { Utilitys } from '../util/image'
import { useDispatch } from 'react-redux'

export default function ImageSelectButton(props) {
    const dispatch = useDispatch()
    const fileInput = React.createRef()

    const fileSelected = () => {
        Utilitys.fetchImageFromFile(fileInput.current.files[0])
            .then(img => {
                dispatch(imageSelectSuccess(img))
                props.imageSelected()
            })
            .catch(e => {
                dispatch(imageSelectFailure(e))
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