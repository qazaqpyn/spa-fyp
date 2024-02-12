import React, { useState } from 'react';
import './Slider.css';

interface SliderProps {
    values: (string | number)[];
    changeTime: (t: string | number) => void;
}

export const Slider: React.FC<SliderProps> = ({ values, changeTime }) => {
    const [value, setValue] = useState<string | number>(values[0]);

    const handleChange = (event) => {
        setValue(values[event.target.value]);
        changeTime(value);
    };

    return (
        <div className="slider-container">
            <input type="range" min="0" max={values.length - 1} value={values.indexOf(value)} onChange={handleChange} className="slider" />
            <p className="slider-value">Time: {value}</p>
        </div>
    );
};
