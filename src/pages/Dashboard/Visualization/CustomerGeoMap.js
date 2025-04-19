import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';
import L from 'leaflet';
import {ResponsiveContainer} from "recharts"

const PORT = process.env.REACT_APP_API_URL;

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
        axios.get(`${PORT}api/customers/locations`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
                // "Authorization": "Bearer YOUR_TOKEN_HERE" // Uncomment if using auth
            }
        }).then(res => setLocations(res.data))
            .catch(err => {
                if (err.response) {
                    console.error("Error Response:", err.response.status, err.response.data);
                } else {
                    console.error("Network Error:", err.message);
                }
            });
    }, []);

    const heatmapPoints = locations.map(loc => [loc.latitude, loc.longitude, 1]);

    return (
        <div className="p-6 font-sans bg-gray-900 text-white">
         <h2 className="text-center text-xl font-semibold  mb-4"> Customer Map by Location</h2>
            {/* <div className="text-center mb-4">
                <label className="text-black text-sm inline-block mb-2">
                    <input
                        type="checkbox"
                        checked={showHeatmap}
                        onChange={() => setShowHeatmap(!showHeatmap)}
                        className="mr-2"
                    />
                    Show Heatmap
                </label>
            </div> */}
            
                  <ResponsiveContainer width="100%" height={400}>
                <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={false} className="h-full  w-full">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    {showHeatmap && <HeatmapLayer points={heatmapPoints} />}
                    {locations.map(loc => (
                        <CircleMarker
                            key={loc.customerId}
                            center={[loc.latitude, loc.longitude]}
                            radius={6}
                            fillOpacity={0.9}
                            color="#00e0ff"
                            weight={2}
                        >
                            <Popup>
                                <strong>{loc.customerName}</strong><br />
                                {loc.cityName}<br />
                                Lat: {loc.latitude}, Long: {loc.longitude}
                            </Popup>
                        </CircleMarker>
                    ))}
                </MapContainer>
                </ResponsiveContainer>
            </div>
       
    );
};

export default CustomerGeoMap;
