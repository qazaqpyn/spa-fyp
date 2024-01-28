import React from 'react';
import { FC } from 'react';
import { Session } from '../../repo/Session';

// React component for Two button for two types KDV and STKDV and after clicking it will show the result
interface TyperProps {
    createSession: (type: 'KDV' | 'STKDV') => void;
}

export const Typer: FC<TyperProps> = ({ createSession }) => {
    return (
        <div>
            <h2 className="text-lg font-weight-bold text-center">Choose type</h2>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" onClick={() => createSession('KDV')}>
                    Single KDV
                </button>
                <button className="btn btn-primary" onClick={() => createSession('STKDV')}>
                    Spatio-Temporal KDV
                </button>
            </div>
        </div>
    );
};
