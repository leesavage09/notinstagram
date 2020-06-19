import React from 'react';

export const STYLE_DANGER = "options-modal__item options-modal__item--danger";
export const STYLE_PRIMARY = "options-modal__item options-modal__item--primary";
export const STYLE_DEFAULT = "options-modal__item";

export default function OptionsModal(props) {
    return (
        <div className='options-modal' onClick={props.onClose}>
            <div className='options-modal__body' onClick={e => e.stopPropagation()}>
                <h3 className='options-modal__title'>{props.title}</h3>
                <p className='options-modal__text'>{props.text}</p>
                <div className='options-modal__list'>
                    {props.elements}
                    {props.onClose ? (<button
                        className='options-modal__item'
                        onClick={props.onClose}
                    >Cancel</button>) : ''}
                </div>
            </div>
        </div>
    )
}