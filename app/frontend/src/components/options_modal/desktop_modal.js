import React from 'react';
import OptionsModal from './options_modal'

export default function DesktopModal() {
    return (
        <div className="desktop-modal">
            <OptionsModal
                title='Welcome to the notinstagram demo'
                text="This is designed for a mobile phone. To continue"
                elements={[
                    <ul className="desktop-modal__list" key="1">
                        <li>1. Use a mobile device</li>
                        <li>2. Open mobile simulator in the browser devtools</li>
                    </ul>
                ]}
            />
        </div>
    )
}