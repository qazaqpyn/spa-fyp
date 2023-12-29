import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import { useEffect } from 'react';
import { addressPoints } from '../../assets/data';
import 'leaflet/dist/leaflet.css';

export const HeatMap = ({data}) => {
    const map = useMap();
    useEffect(() => {
        const points = data
            ? data.map((p) => {
                  return [p[0], p[1], p[2]]; // lat lng intensity
              })
            : [];
        
        setTimeout(function(){
            L.heatLayer(points).addTo(map);
        },500)
    }, []);
    return null;
};
