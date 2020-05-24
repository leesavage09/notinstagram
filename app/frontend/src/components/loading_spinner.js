import React from 'react';

export const SMALL_LOADING_SPINNER = '--small'
export const LARGE_LOADING_SPINNER = '--large'

export default function LoadingSpinner(props) {

    return (
        <div className={`round-spinner round-spinner${props.spinnerStyle}`}>
            <div className='round-spinner__container'>
                <div className="round-spinner__lds-spinner round-spinner__lds-spinner">
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
            </div>
        </div>
    );
}