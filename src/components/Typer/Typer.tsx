import React from 'react';
import './Typer.css';
import { Button } from '../Button';
import { Session } from '../../repo/Session';
import { useEffect, useState } from 'react';
import { DragDropFile } from '../DragDropFile';
import { Parameters } from '../Parameters';
import { Phase } from '../../App';

interface TyperProps {
    session: Session | null;
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    phase: Phase;
    setPhase: React.Dispatch<React.SetStateAction<Phase>>;
}

export const Typer: React.FC<TyperProps> = ({ session, setSession, setLoading, phase, setPhase }) => {
    const createSession = (type: 'KDV' | 'STKDV') => {
        const session = new Session(type);
        setSession(session);
        setPhase(Phase.DATASET);
    };

    const completeParams = () => {
        setPhase(Phase.MAP);
    };

    const completeDataset = () => {
        setPhase(Phase.PARAMETERS);
    };

    /* 
    TODO:
    1. Session: with type KDV or STKDV
    2. Dataset: upload the file and parse it
    3. Parameters 
    4. CalculatedData: fetch the data from the server
    5. Map from Session 
    */

    return (
        <>
            {phase === Phase.TYPE && (
                <div className="types">
                    <div className="type-buttons-header">
                        <h1>Choose a KDV type</h1>
                    </div>
                    <div className="type-buttons">
                        <Button title="" description="Single KDV" onClick={() => createSession('KDV')} />
                        <Button title="" description="Spatio-Temporal KDV" onClick={() => createSession('STKDV')} />
                    </div>
                </div>
            )}

            {phase === Phase.DATASET && <DragDropFile session={session!} setLoading={setLoading} completeDataset={completeDataset} />}

            {phase === Phase.PARAMETERS && <Parameters session={session!} completeParams={completeParams} />}
        </>
    );
};
