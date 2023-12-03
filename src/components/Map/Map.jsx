import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { HeatMap } from '../HeatMap';
import 'leaflet/dist/leaflet.css';

export const Map = () => {
    return (
        <MapContainer center={[-37.8839, 175.3745188667]} zoom={13} scrollWheelZoom={false} style={{width: '100%', height: '500px'}}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* Other map-related components */}
            <HeatMap />
        </MapContainer>
    );
};
