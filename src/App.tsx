import React, { useState } from 'react';
import { DragDropFile } from './components/DragDropFile';
import { Parameters } from './components/Parameters';
import { Loading } from './components/Loading';
import { postApi } from './api/requests';
import { Map } from './components/Map';
import { DataResponse } from './api/dto/dataDTO';

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
    const [result, setResult] = useState<DataResponse | null>(null);
    const submit = async () => {
        if (!file) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        const formData = new FormData();
        formData.append('file', file as Blob, file.name);
        formData.append('parameters', JSON.stringify(parameters));
        // const data = postApi('generate', formData);
        // data.then((res) => {
        //     setResult(res as DataResponse);
        // });
        setResult({
            middle: [0, 0],
            data: [[0, 0]],
        });
    };
    const reset = () => {
        setLoading(true);
        setFile(null);
        setParameters(null);
        setResult(null);
        setLoading(false);
    };

    const download = () => {
        // download function
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    return (
        <div>
            {loading && <Loading />}
            {!result && (
                <>
                    <DragDropFile file={file} setFile={setFile} />
                    {file && <Parameters data={parameters} setParameters={setParameters} />}
                    {parameters && file && (
                        <div className="next-button">
                            <button id="button" className="btn" onClick={submit}>
                                Generate result
                            </button>
                        </div>
                    )}
                </>
            )}
            {result && (
                <>
                    <h2 className="text-lg font-weight-bold text-center">Dataset Visualization on Map </h2>
                    <Map />
                    <div className="next-button">
                        <button id="button" className="btn" onClick={download}>
                            Download
                        </button>
                    </div>
                    <div className="next-button">
                        <button id="button" className="btn" onClick={reset}>
                            Upload new file
                        </button>
                    </div>
                </>
            )}

            {/* {result && <Map data={result.data} middle={result.middle} />} */}
        </div>
    );
}
