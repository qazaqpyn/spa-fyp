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
    const [phase, setPhase] = useState<Phase>(Phase.TYPE);

    const [mapData, setMapData] = useState<DataResponse>(DEFAULT_VALUES);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [session, setSession] = useState<Session | null>(null);
    // const [fileData, setFile] = useState<number[][] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    // const [result, setResult] = useState<DataResponse | null>(null);

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
        }
    }, [phase]);
    // const submit = async () => {
    //     setLoading(true);

    //     setTimeout(() => {
    //         setLoading(false);
    //         setResult({
    //             middle: [-37.8839, 175.3745188667],
    //             data: addressPoints,
    //         });
    //     }, 2000);

    //     // const body: DataRequest = {
    //     //     data: fileData || [],
    //     //     params: parameters || {},
    //     // };

    //     // const data = postApi('generate', body);
    //     // data.then((res) => {
    //     //     setResult(res as DataResponse);
    //     //     console.log(res);
    //     // }).finally(() => {
    //     //     setLoading(false);
    //     // });
    // };
    // const reset = () => {
    //     setLoading(true);
    //     setFile(null);
    //     setParameters(null);
    //     setResult(null);
    //     setLoading(false);
    // };

    // const download = () => {
    //     // download function
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);
    // };

    return (
        // <div>
        //     {loading && <Loading />}
        //     {!result && (
        //         <>
        //             <DragDropFile session={session!} setLoading={setLoading} />
        //             {fileData && <Parameters session={session!} />}
        //             {parameters && fileData && (
        //                 <div className="next-button">
        //                     <button id="button" className="btn" onClick={submit}>
        //                         Generate result
        //                     </button>
        //                 </div>
        //             )}
        //         </>
        //     )}
        //     {result && (
        //         <>
        //             <h2 className="text-lg font-weight-bold text-center">Dataset Visualization on Map </h2>
        //             <Map result={result} />
        //             <div className="next-button">
        //                 <button id="button" className="btn" onClick={download}>
        //                     Download
        //                 </button>
        //             </div>
        //             <div className="next-button">
        //                 <button id="button" className="btn" onClick={reset}>
        //                     Upload new file
        //                 </button>
        //             </div>
        //         </>
        //     )}

        //     {/* {result && <Map data={result.data} middle={result.middle} />} */}
        // </div>
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
