import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import * as UISelector from '../redux/selectors/ui_selector'

export default function ToastNotification() {
    const notification = React.createRef();
    const messages = useSelector(state => UISelector.allMessages(state))

    const show = messages.length > 0

    useEffect(() => {
        if (show) {
            notification.current.className = "toast-notification toast-notification--show"

            setTimeout(function () {
                if (notification.current) notification.current.className = "toast-notification toast-notification--hide"
            }, 4500);
        }
    });

    return show ? (
        <div ref={notification} className='toast-notification'>
            {messages[0]}
        </div>
    ) : ''
}