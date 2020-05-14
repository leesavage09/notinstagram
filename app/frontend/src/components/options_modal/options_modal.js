import React from 'react';

export const STYLE_DANGER = "--danger";
export const STYLE_PRIMARY = "--primary";

export default function OptionsModal(props) {
    const options = []

    props.options.forEach((option, i) => {
        const style = option.style !== "" ?
            "options-modal__item options-modal__item" + option.style : "options-modal__item"

        options.push(
            <button
                key={i}
                className={style}
                onClick={e => option.action(e)}
            >{option.text}</button>
        )
    });

    return (
        <div className='options-modal' onClick={props.onClose}>
            <div className='options-modal__body' onClick={e => e.stopPropagation()}>
                <h3 className='options-modal__title'>{props.title}</h3>
                <div className='options-modal__list'>
                    {options}
                    <button
                        className='options-modal__item'
                        onClick={props.onClose}
                    >Cancel</button>
                </div>
                {props.children}
            </div>
        </div>
    )
}