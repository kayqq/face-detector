import React, { useState } from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onButtonSubmit }) => {
    const [value, setValue] = useState('');
    return (
        <div className="center">
            <div className="form center pa3 br3 shadow-5">
                <input
                    id="imagelink"
                    className="f4 pa2 w-70 center"
                    type="text"
                    onChange={e => setValue(e.target.value)}
                />{' '}
                <button
                    className="w-30 grow f5 link ph3 pv2 dib white bg-purple"
                    onClick={() => onButtonSubmit(value)}
                >
                    Detect
                </button>
            </div>
        </div>
    );
};

export default ImageLinkForm;
