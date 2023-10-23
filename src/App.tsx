import React, { useState } from 'react';
import { DragDropFile } from './components/DragDropFile';
import { Parameters } from './components/Parameters';

export default function App() {
    const [file, setFile] = useState<File | null>(null);
    return (
        <div>
            <DragDropFile file={file} setFile={setFile} />
            {file && <Parameters />}
        </div>
    );
}
