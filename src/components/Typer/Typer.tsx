import React from 'react';
import './Typer.css';
import { Button } from '../Button';
import { Session } from '../../repo/Session';

interface TyperProps {
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

export const Typer: React.FC<TyperProps> = ({ setSession }) => {
    const createSession = (type: 'KDV' | 'STKDV') => {
        const session = new Session(type);
        setSession(session);
    };

    return (
        <div className="types">
            <div className="type-buttons-header">
                <h1>Choose a KDV type</h1>
            </div>
            <div className="type-buttons">
                <Button title="" description="Single KDV" onClick={() => createSession('KDV')} />
                <Button title="" description="Spatio-Temporal KDV" onClick={() => createSession('STKDV')} />
            </div>
        </div>
    );
};
