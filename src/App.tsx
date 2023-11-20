import React, { useState } from 'react';
import { DragDropFile } from './components/DragDropFile';
import { Parameters } from './components/Parameters';
import { Loading } from './components/Loading';
import { postApi } from './api/requests';

export interface Iparameters {
    kdvType: 'KDV' | 'SRKDV';
    gps: boolean;
    bandwidthS: number;
    rowP: number;
    colP: number;
    bandwidthT: number;
    tPixel: number;
    nThreads: number;
}

export default function App() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [parameters, setParameters] = useState<Iparameters | null>(null);
    const submit = async () => {
        if (!file) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        const formData = new FormData();
        formData.append('file', file as Blob, file.name);
        formData.append('parameters', JSON.stringify(parameters));
        // postApi('generate', formData);
    };

    return (
        <div>
            {loading && <Loading />}
            <DragDropFile file={file} setFile={setFile} />
            {file && <Parameters data={parameters} setParameters={setParameters} />}
            {parameters && file && (
                <div className="next-button">
                    <button id="button" className="btn" onClick={submit}>
                        Generate result
                    </button>
                </div>
            )}
        </div>
    );
}
