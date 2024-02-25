import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { HeatMap } from '../HeatMap';
import 'leaflet/dist/leaflet.css';

export const Map = React.forwardRef((props, ref) => {
    const { data, middle } = props;
    return (
        <div ref={ref}>
            <MapContainer center={middle} zoom={13} scrollWheelZoom={true} style={{ width: '100%', height: '90vh' }}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* Other map-related components */}
                {data && <HeatMap data={data}/>}
            </MapContainer>
        </div>
    );
});