import React from 'react';
import { DragEventHandler, FC, useRef, useState } from 'react';
import { readCSVFile } from '../../utils/parser';
import './DragDropFile.css';

interface DragDropFileProps {
    fileData: number[][] | null;
    setFileData: React.Dispatch<React.SetStateAction<number[][] | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DragDropFile: FC<DragDropFileProps> = ({ fileData, setFileData, setLoading }) => {
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDrag = (e: React.DragEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave' || e.type === 'drop') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            if (!checkFileExtension(e.dataTransfer.files[0].name)) return;
            setFile(e.dataTransfer.files[0]);
            readCSVFile(e.dataTransfer.files[0])
                .then((res) => setFileData(res))
                .finally(() => setLoading(false));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        e.preventDefault();
        e.stopPropagation();
        if (e.target.files && e.target.files[0]) {
            if (!checkFileExtension(e.target.files[0].name)) return;
            setFile(e.target.files[0]);
            readCSVFile(e.target.files[0])
                .then((res) => setFileData(res))
                .finally(() => setLoading(false));
        }
    };

    const inputRef = useRef<HTMLInputElement | null>(null);

    const onButtonClick = () => {
        if (!inputRef.current) return;

        inputRef.current.click();
    };

    const checkFileExtension = (fileName: string): boolean => {
        const fileExtension = fileName.split('.').pop();
        if (fileExtension !== 'csv') {
            setError('File should be in csv format');
            setFileData(null);
            return false;
        }
        return true;
    };

    const resetAll = () => {
        setFile(null);
        setFileData(null);
        setError(null);
    };

    return (
        <div className="container-fluid text-center p-2">
            {file && fileData ? (
                <div className="w-100 d-flex justify-content-center ">
                    <div className="card w-50 bg-light border-success">
                        <div className="delete" onClick={resetAll}>
                            <span className="text-danger align-baseline">X</span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-success">File uploaded</h5>
                            <p className="card-text">
                                {file.name} - {file.size} bytes
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-lg font-weight-bold">Upload your file</h2>
                    <p className="text-sm text-secondary">File should be in csv format and contain at least 2 columns</p>
                    {error && <p className="text-danger">{error}</p>}
                    <form id="form-file-upload" onDragEnter={handleDrag}>
                        <input ref={inputRef} type="file" id="input-file-upload" multiple={true} className=" hidden" onChange={handleChange} />
                        <label id="label-file-upload" htmlFor="input-file-upload">
                            <div>
                                <p>Drag and drop your file here or</p>
                                <button className="p-1 text-sm bg-transparent hover:underline text-black" onClick={onButtonClick}>
                                    Upload a csv file
                                </button>
                            </div>
                        </label>
                        {dragActive && (
                            <div
                                id="drag-file-element"
                                onDragEnter={handleDrag as unknown as DragEventHandler<HTMLDivElement>}
                                onDragLeave={handleDrag as unknown as DragEventHandler<HTMLDivElement>}
                                onDragOver={handleDrag as unknown as DragEventHandler<HTMLDivElement>}
                                onDrop={handleDrop as unknown as DragEventHandler<HTMLDivElement>}
                            ></div>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};
