import React from 'react';
import { FC } from 'react';
import './Loading.css';

export const Loading: FC = () => {
    return (
        <div className="loading">
            <div className="lds-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};
