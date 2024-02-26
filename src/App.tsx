import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DragDropFile } from './components/DragDropFile';
import { Parameters } from './components/Parameters';
import { Loading } from './components/Loading';
import { postApi } from './api/requests';
import { Map } from './components/Map';
import { DataResponse } from './api/dto/dataDTO';
import { addressPoints } from './assets/data';
import { Session } from './repo/Session';
import { Title } from './components/Title';
import { ChangeButton } from './components/AddButton';
import { Modal } from './components/Modal';
import { Button } from './components/Button';
import { Typer } from './components/Typer';
import { Slider } from './components/Slider';
import { toPng } from 'html-to-image';

var DEFAULT_VALUES = {
    middle: [22.3193, 114.1694],
    data: [],
};

export enum Phase {
    TYPE,
    DATASET,
    PARAMETERS,
    FETCH,
    MAP,
}

export default function App() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [timeFrames, setTimeFrames] = useState<(string | number)[]>([]);
    const [phase, setPhase] = useState<Phase>(Phase.TYPE);
    const [mapData, setMapData] = useState<DataResponse | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const toggle = () => {
        if (!isOpen) resetSession();

        setIsOpen(!isOpen);
    };

    const resetSession = () => {
        DEFAULT_VALUES.middle = [22.3193, 114.1694];
        setMapData(null);
        setSession(null);
        setPhase(Phase.TYPE);
    };

    const changingMap = () => {
        if (mapData) {
            DEFAULT_VALUES.middle = mapData.middle;
            setMapData(null);
        }
    };

    useEffect(() => {
        if (phase === Phase.FETCH) {
            setIsOpen(false);
            setLoading(true);
            changingMap();

            session!
                .fetchCalculatedData()
                .then(() => {
                    setMapData(session!.getCalculatedData());
                    if (session!.type === 'STKDV') {
                        setTimeFrames(session!.getTimeFrames());
                    }
                })
                .finally(() => {
                    setLoading(false);
                    setPhase(Phase.MAP);
                });
        }
    }, [phase]);

    const changeTimeFrame = (t: string | number) => {
        setLoading(true);
        changingMap();

        setTimeout(() => {
            setMapData(session!.getCalculatedData(t));
            setLoading(false);
        }, 1000);
    };

    const changeParams = () => {
        setPhase(Phase.PARAMETERS);
        setIsOpen(true);
    };

    const downloadMap = useCallback(() => {
        if (mapRef.current === null) {
            return;
        }
        setLoading(true);

        toPng(mapRef.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = fileNaming();
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [mapRef]);

    const fileNaming = (): string => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `DVS_${year}${month}${day}${hours}${minutes}${seconds}.png`;
    };

    return (
        <div>
            {loading && <Loading />}
            <Title />
            {!mapData && <Map ref={mapRef} {...DEFAULT_VALUES} />}
            {mapData && <Map ref={mapRef} {...mapData} />}
            <ChangeButton text="+" toggle={toggle} />
            {phase === Phase.MAP && <ChangeButton text="D" toggle={downloadMap} downloadClass />}
            {phase === Phase.MAP && <ChangeButton text="E" toggle={changeParams} editClass />}
            {phase === Phase.MAP && session!.type === 'STKDV' && <Slider values={timeFrames} changeTime={changeTimeFrame} />}

            <Modal open={isOpen} onClose={toggle}>
                <Typer session={session} setSession={setSession} setLoading={setLoading} phase={phase} setPhase={setPhase} />
            </Modal>
        </div>
    );
}
