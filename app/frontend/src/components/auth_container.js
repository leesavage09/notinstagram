import React from 'react';

export default function AuthContainer(props) {
    return (
        <div className="no-auth-body">
            <div className="no-auth-container">
                <div className='body'>
                    <h1 className="logo" >notinstagram</h1>
                    {props.children}
                </div>
                <div className='footer'>
                    <p>
                        <span className='from'>NOT from</span>
                        <span className='facebook'>FACEBOOK</span>
                    </p>
                </div>
            </div>
        </div>
    );
}