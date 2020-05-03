import React from 'react';

export default function AuthContainer(props) {
    return (
        <div className="auth-container">
            <div className="auth-container__box">
                <div className='auth-container__body'>
                    <h1 className="auth-container__logo" >notinstagram</h1>
                    {props.children}
                </div>
            </div>

            <div className='auth-footer'>
                    <p>
                        <span className='auth-footer__from'>NOT from</span>
                        <span className='auth-footer__facebook'>FACEBOOK</span>
                    </p>
                </div>
        </div>
    );
}