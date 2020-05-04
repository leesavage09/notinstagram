import React from 'react';

export default function Icons(props) {
    const selected = props.selected ? '--selected' : ''
    const iconName = props.iconName + selected;
    const givenClassName = props.className + ' svg-icon'

    return (
        <svg className={givenClassName} viewBox="0 0 48 48">
            <path className={iconName}  />
        </svg>
    );
}


