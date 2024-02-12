import React, { useEffect, useRef, useState } from 'react';
import { DragDropFile } from './components/DragDropFile';
import { Parameters } from './components/Parameters';
import { Loading } from './components/Loading';
import { postApi } from './api/requests';
import { Map } from './components/Map';
import { DataResponse } from './api/dto/dataDTO';
import { addressPoints } from './assets/data';
import { Session } from './repo/Session';
import { Title } from './components/Title';
import { AddButton } from './components/AddButton';
import { Modal } from './components/Modal';
import { Button } from './components/Button';
import { Typer } from './components/Typer/Typer';

const DEFAULT_VALUES = {
    middle: [22.3193, 114.1694],
    data: [],
};

export enum Phase {
    TYPE,
    DATASET,
    PARAMETERS,
    MAP,
}

export default function App() {
    const [timeFrames, setTimeFrames] = useState<(string | number)[]>([]);
    const [phase, setPhase] = useState<Phase>(Phase.TYPE);
    const [mapData, setMapData] = useState<DataResponse>(DEFAULT_VALUES);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const toggle = () => {
        if (!isOpen) resetSession();

        setIsOpen(!isOpen);
    };

    const resetSession = () => {
        setSession(null);
        setPhase(Phase.TYPE);
    };

    useEffect(() => {
        if (phase === Phase.MAP) {
            setIsOpen(false);
            setLoading(true);

            session!
                .fetchCalculatedData()
                .then(() => {
                    setMapData(session!.getCalculatedData());
                    if (session!.type === 'STKDV') setTimeFrames(session!.getTimeFrames());
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [phase]);

    const changeTimeFrame = (t: string | number) => {
        setMapData(session!.getCalculatedData(t));
    };

    return (
        <div>
            {loading && <Loading />}
            <Title />
            <Map result={mapData} />
            <AddButton toggle={toggle} />

            <Modal open={isOpen} onClose={toggle}>
                <Typer session={session} setSession={setSession} setLoading={setLoading} phase={phase} setPhase={setPhase} />
            </Modal>
        </div>
    );
}
