import React from 'react';
import './Button.css';

interface ButtonProps {
    title: string;
    description?: string;
    onClick: () => void;
    buttonStyle?: ButtonStyle;
}

export enum ButtonStyle {
    Primary = 'primary',
    Danger = 'danger',
    Secondary = 'secondary',
}

export const Button: React.FC<ButtonProps> = ({ title, description, onClick, buttonStyle }) => {
    const getButtonClassName = (): string => {
        switch (buttonStyle) {
            case ButtonStyle.Primary:
                return 'primary-button';
            case ButtonStyle.Danger:
                return 'danger-button';
            case ButtonStyle.Secondary:
                return 'secondary-button';
            default:
                return 'default-button';
        }
    };

    return (
        <button onClick={onClick} className={getButtonClassName()}>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
        </button>
    );
};
