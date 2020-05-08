import React, { useEffect } from 'react';

export default function toastNotification(props) {
    const notification = React.createRef();

    useEffect(() => {
        notification.current.className = "toast-notification toast-notification--show"

        setTimeout(function () {
            if (notification.current) {
                notification.current.className = "toast-notification toast-notification--hide"
            }
        }, props.duration);
    });

    return (
        <div ref={notification} className='toast-notification'>
            {props.message}
        </div>
    );
}