import React, { useState } from 'react';
import './AddButton.css';

interface AddButtonProps {
    toggle: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ toggle }) => {
    return (
        <div className="add-button-container">
            <button className="add-button" onClick={toggle}>
                +
            </button>
        </div>
    );
};
