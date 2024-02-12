import React, { useState } from 'react';
import './ChangeButton.css';

interface ChangeButtonProps {
    text: string;
    toggle: () => void;
    editClass?: boolean;
}

export const ChangeButton: React.FC<ChangeButtonProps> = ({ text, toggle, editClass = false }) => {
    return (
        <div className={editClass ? 'edit-button-container' : 'add-button-container'}>
            <button className="add-button" onClick={toggle}>
                {text}
            </button>
        </div>
    );
};
