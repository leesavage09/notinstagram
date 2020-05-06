import React, { useEffect } from 'react';

export default function toastNotification(props) {
    const notification = React.createRef();

    useEffect(() => {
        notification.current.className = "toast-notification toast-notification--show"

        setTimeout(function () {
            notification.current.className = "toast-notification toast-notification--hide"

            setTimeout(function () { 
                props.onComplete()  
            }, 300);
        }, props.duration);
    });

    return (
        <div ref={notification} className='toast-notification'>
            {props.message}
        </div>
    );
}