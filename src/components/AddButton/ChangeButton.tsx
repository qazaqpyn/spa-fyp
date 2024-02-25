import React, { useState } from 'react';
import './ChangeButton.css';

interface ChangeButtonProps {
    text: string;
    toggle: () => void;
    editClass?: boolean;
    downloadClass?: boolean;
}

export const ChangeButton: React.FC<ChangeButtonProps> = ({ text, toggle, editClass = false, downloadClass = false }) => {
    const className = editClass ? 'edit-button-container' : downloadClass ? 'download-button-container' : 'add-button-container';
    return (
        <div className={className}>
            <button className="add-button" onClick={toggle}>
                {text}
            </button>
        </div>
    );
};
