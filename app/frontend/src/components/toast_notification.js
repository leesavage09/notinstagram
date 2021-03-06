import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toastSelector, toastActions } from '../redux/slice/toast_slice'
import { debounce } from '../util/helpers'

export default function ToastNotification() {
    const dispatch = useDispatch()
    const notification = React.createRef();
    const messages = useSelector(toastSelector.allMessages())
    const show = messages.length > 0

    const clearMsg = debounce(() => dispatch(toastActions.clearMessages()), 4800)
    const [clearMessages] = useState(() => clearMsg)

    useEffect(() => {
        if (show) {
            notification.current.className = "toast-notification toast-notification--show"
            setTimeout(() => {
                if (notification.current) notification.current.className = "toast-notification toast-notification--hide"
            }, 4500);
            clearMessages()
        }
    });

    return show ? (
        <div ref={notification} className='toast-notification'>
            {messages[0]}
        </div>
    ) : ''
}