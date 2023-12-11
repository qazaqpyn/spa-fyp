import React from 'react';
import { FC, useState } from 'react';
import './Parameters.css';
import { Iparameters } from '../../App';

interface ParametersProps {
    data: Iparameters | null;
    setParameters: (data: Iparameters | null) => void;
}

type KdvType = 'KDV' | 'SRKDV';

export const Parameters: FC<ParametersProps> = ({ data, setParameters }) => {
    const [next, setNext] = useState<boolean>(false);
    const [kdvType, setKdvType] = useState<KdvType>('KDV');
    const [gps, setGps] = useState<boolean>(false);
    const [bandwidthS, setBandwidthS] = useState<number>(1000);
    const [rowP, setRowP] = useState<number>(800);
    const [colP, setColP] = useState<number>(640);
    const [bandwidthT, setBandwidthT] = useState<number>(6);
    const [tPixel, setTPixel] = useState<number>(32);
    const [nThreads, setNThreads] = useState<number>(8);
    const setParametersHandler = () => {
        setNext(true);
        setParameters({
            kdvType,
            gps,
            bandwidthS,
            rowP,
            colP,
            bandwidthT,
            tPixel,
            nThreads,
        });
    };

    const edit = () => {
        setNext(false);
        setParameters(null);
    };

    return (
        <div className="w-100">
            <h2 className="text-lg font-weight-bold text-center">{next ? 'Parameters' : 'Set up parameters'}</h2>
            <div className="form-parameters">
                {next && (
                    <div className="delete" onClick={edit}>
                        <span className="text-danger align-baseline">X</span>
                    </div>
                )}
                <div className="form-group row">
                    <label className="col-sm-7 col-form-label" htmlFor="kdvType">
                        KDV Type:
                    </label>
                    <div className="col-sm">
                        <select
                            disabled={next}
                            className="form-control"
                            name="kdvType"
                            id="kdvType"
                            value={kdvType}
                            onChange={(e) => setKdvType(e.target.value as KdvType)}
                        >
                            <option value="KDV">Single KDV</option>
                            <option value="SRKDV">Spatio-Temporal KDV</option>
                        </select>
                    </div>
                </div>
                <div className="form-check">
                    <input
                        disabled={next}
                        className="form-check-input"
                        type="checkbox"
                        name="gps"
                        id="gps"
                        checked={gps}
                        onChange={(e) => setGps(e.target.checked)}
                    />
                    <label htmlFor="gps" className="form-check-label">
                        GPS (use geographic coordinate system)
                    </label>
                </div>
                <div className="form-group row">
                    <label className="col-sm-7 col-form-label" htmlFor="bandwidthS">
                        Spatial bandwidth (in terms of meters)
                    </label>
                    <div className="col-sm">
                        <input
                            disabled={next}
                            className="form-control"
                            type="number"
                            name="bandwidthS"
                            id="bandwidthS"
                            value={bandwidthS}
                            onChange={(e) => setBandwidthS(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-7 col-form-label" htmlFor="rowP">
                        Number of grids in the x-axis
                    </label>
                    <div className="col-sm">
                        <input
                            disabled={next}
                            className="form-control"
                            type="number"
                            name="rowP"
                            id="rowP"
                            value={rowP}
                            onChange={(e) => setRowP(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-7 col-form-label" htmlFor="colP">
                        Number of grids in the y-axis
                    </label>
                    <div className="col-sm">
                        <input
                            disabled={next}
                            className="form-control"
                            type="number"
                            name="colP"
                            id="colP"
                            value={colP}
                            onChange={(e) => setColP(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-7 col-form-label" htmlFor="bandwidthT">
                        Temporal bandwidth (in terms of days)
                    </label>
                    <div className="col-sm">
                        <input
                            disabled={next}
                            className="form-control"
                            type="number"
                            name="bandwidthT"
                            id="bandwidthT"
                            value={bandwidthT}
                            onChange={(e) => setBandwidthT(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-7 col-form-label" htmlFor="tPixel">
                        Number of grids in the t-axis
                    </label>
                    <div className="col-sm">
                        <input
                            disabled={next}
                            className="form-control"
                            type="number"
                            name="tPixel"
                            id="tPixel"
                            value={tPixel}
                            onChange={(e) => setTPixel(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-7 col-form-label" htmlFor="nThreads">
                        Number of threads
                    </label>
                    <div className="col-sm">
                        <input
                            disabled={next}
                            className="form-control"
                            type="number"
                            name="nThreads"
                            id="nThreads"
                            value={nThreads}
                            onChange={(e) => setNThreads(Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>

            {!next && (
                <div className="next-button">
                    <button id="button" className="btn" onClick={setParametersHandler}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};
