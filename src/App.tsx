import React, { useState } from 'react';
import { DragDropFile } from './components/DragDropFile';
import { Parameters } from './components/Parameters';
import { Loading } from './components/Loading';
import { postApi } from './api/requests';
import { Map } from './components/Map';
import { DataResponse } from './api/dto/dataDTO';
import { DataRequest } from './api/dto/dataDTO';
import { Iparameters } from './api/dto/dataDTO';
import { addressPoints } from './assets/data';

export default function App() {
    const [fileData, setFile] = useState<number[][] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [parameters, setParameters] = useState<Iparameters | null>(null);
    const [result, setResult] = useState<DataResponse | null>(null);
    const submit = async () => {
        if (!fileData && !parameters) return;
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);

        setResult({
            middle: [-37.8839, 175.3745188667],
            data: addressPoints,
        });

        // const body: DataRequest = {
        //     data: fileData || [],
        //     params: parameters || {},
        // };

        // const data = postApi('generate', body);
        // data.then((res) => {
        //     setResult(res as DataResponse);
        // }).finally(() => {
        //     setLoading(false);
        // });
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
                    <DragDropFile fileData={fileData} setFileData={setFile} />
                    {fileData && <Parameters data={parameters} setParameters={setParameters} />}
                    {parameters && fileData && (
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
                    <Map result={result} />
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
