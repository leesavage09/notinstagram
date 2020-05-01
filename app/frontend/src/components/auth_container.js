import React from 'react';

export default function NoAuthContainer(props) {
    return (
        <div className='no_auth'>
            <h1 className="logo" >notinstagram</h1>
            {props.children}
            <div className='footer'>
                <p>
                    <span className='from'>NOT from</span>
                    <span className='facebook'>FACEBOOK</span>
                </p>
            </div>
        </div>
    );
}