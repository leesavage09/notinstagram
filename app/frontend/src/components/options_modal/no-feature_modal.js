import React from 'react';
import OptionsModal from './options_modal'
import { modalActions, modalSelector } from '../../redux/slice/modal_slice'
import { useSelector, useDispatch } from 'react-redux'

export function DirectMessageModal() {
    const dispatch = useDispatch();
    const show = useSelector(modalSelector.DMModalVisible())

    const close = () => dispatch(modalActions.showDMModal(false))

    return show ? (
        <OptionsModal
            title='Direct messaging'
            text="Is not yet a feature of notinstagram..."
            onClose={close}
        />
    ) : ''
}

export function SavePostModal() {
    const dispatch = useDispatch();
    const show = useSelector(modalSelector.saveModalVisible())

    const close = () => dispatch(modalActions.showSaveModal(false))

    return show ? (
        <OptionsModal
            title='Save to collection'
            text="Is not yet a feature of notinstagram..."
            onClose={close}
        />
    ) : ''
}