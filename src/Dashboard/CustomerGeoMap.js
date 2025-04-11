import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';
import L from 'leaflet';

const HeatmapLayer = ({ points }) => {
    const map = useMap();

    useEffect(() => {
        if (!points.length) return;

        const heatLayer = L.heatLayer(points, {
            radius: 25,
            blur: 15,
            maxZoom: 5,
            gradient: {
                0.2: 'blue',
                0.4: 'lime',
                0.6: 'yellow',
                0.8: 'orange',
                1.0: 'red'
            }
        });

        heatLayer.addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [map, points]);

    return null;
};

const CustomerGeoMap = () => {
    const [locations, setLocations] = useState([]);
    const [showHeatmap, setShowHeatmap] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/customers/locations')
            .then(res => setLocations(res.data))
            .catch(err => console.error('Error fetching locations:', err));
    }, []);

    const heatmapPoints = locations.map(loc => [loc.latitude, loc.longitude, 1]);

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'white' }}>Customer Map by Location</h3>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <label style={{ color: 'white', fontSize: '14px' }}>
                    <input
                        type="checkbox"
                        checked={showHeatmap}
                        onChange={() => setShowHeatmap(!showHeatmap)}
                        style={{ marginRight: '6px' }}
                    />
                    Show Heatmap
                </label>
            </div>
            <div style={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                border: '1px solid #333'
            }}>
                <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    {showHeatmap && <HeatmapLayer points={heatmapPoints} />}

                    {locations.map(loc => (
                        <CircleMarker
                            key={loc.customerId}
                            center={[loc.latitude, loc.longitude]}
                            radius={4}
                            fillOpacity={0.9}
                            color="#00e0ff"
                            weight={1}
                        >
                            <Popup>
                                <strong>{loc.customerName}</strong><br />
                                {loc.cityName}<br />
                                Lat: {loc.latitude}, Long: {loc.longitude}
                            </Popup>
                        </CircleMarker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default CustomerGeoMap;