import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { HeatMap } from '../HeatMap';
import 'leaflet/dist/leaflet.css';

export const Map = ({result}) => {
    return (
        <MapContainer center={result.middle} zoom={13} scrollWheelZoom={true} style={{ width: '100%', height: '90vh' }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* Other map-related components */}
            {result.data && <HeatMap data={result.data}/>}
        </MapContainer>
    );
};
  