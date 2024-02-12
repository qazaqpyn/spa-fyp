import React, { useState } from 'react';
import './ChangeButton.css';

interface ChangeButtonProps {
    text: string;
    toggle: () => void;
}

export const ChangeButton: React.FC<ChangeButtonProps> = ({ text, toggle }) => {
    return (
        <div className="add-button-container">
            <button className="add-button" onClick={toggle}>
                {text}
            </button>
        </div>
    );
};
