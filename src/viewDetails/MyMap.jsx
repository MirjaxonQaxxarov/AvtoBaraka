import { useEffect } from 'react';
import L from 'leaflet';
import './leflet.css';
import mrkimg from './mdi--map-marker.png';

// eslint-disable-next-line react/prop-types
export default function MyMap({ lat, long }) {

    useEffect(() => {
        const map = L.map('map', {
            zoomControl: false,
            attributionControl: false,
        }).setView([lat, long], 16);

        const attribution = '';
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(map);

        L.marker([lat, long],{
            icon: L.icon({
                iconUrl: mrkimg,
                iconSize: [50, 50]
            }),
        }).addTo(map);

        return () => {
            map.remove(); // Komponent unmount bo'lganda xaritani tozalash
        };
    }, [lat, long]);

    return (
        <div id="map" style={{ width: '100%', height: '400px' }}></div>
    );
}
