import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ✅ Fix missing icons by importing them
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
const PORT=process.env.REACT_APP_API_URL;
// ✅ Override default icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const AutoFitMap = ({ markers }) => {
    const map = useMap();

    useEffect(() => {
        if (markers.length === 0) return;

        const bounds = L.latLngBounds(markers.map(m => [m.latitude, m.longitude]));
        map.fitBounds(bounds, { padding: [50, 50] });
    }, [markers, map]);

    return null;
};

const SupplierGeoMap = () => {
    const [locations, setLocations] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');

    useEffect(() => {
         axios.get(`${PORT}api/suppliers/locations`,{
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
                // "Authorization": "Bearer YOUR_TOKEN_HERE" // Uncomment if using auth
            }})
            .then(res => {
                const valid = res.data.filter(loc => loc.latitude && loc.longitude);
                setLocations(valid);
            }) .catch(err => {
                if (err.response) {
                    console.error(" Error Response:", err.response.status, err.response.data);
                } else {
                    console.error(" Network Error:", err.message);
                }
            }, [])
    }, []);

    const supplierNames = [...new Set(locations.map(loc => loc.supplierName))];
    const filtered = selectedSupplier
        ? locations.filter(loc => loc.supplierName === selectedSupplier)
        : locations;

    return (
        <div className="bg-transparent text-white p-6 rounded-xl  mb-6">

        {/* Top Section */}
        <div className="mb-6">
            <h2 className="text-3xl text-gray-900 font-bold mb-2 text-center">Supplier Map</h2>
            </div>

            <select
                className="mb-4 p-2 w-full sm:w-1/2 bg-[#334155] text-white rounded border border-gray-600 focus:outline-none"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
            >
                <option value="">All Suppliers</option>
                {supplierNames.map((name, i) => (
                    <option key={i} value={name}>{name}</option>
                ))}
            </select>
            <div className="overflow-x-auto">
            <div className="rounded overflow-hidden border border-gray-600" style={{ width: '100%', height: '80vh' }}>
    <MapContainer
        center={[37.0902, -95.7129]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
    >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AutoFitMap markers={filtered} />
        {filtered.map((loc, i) => (
            <Marker key={i} position={[loc.latitude, loc.longitude]}>
                <Popup>
                    <strong>{loc.supplierName}</strong><br />
                    {loc.cityName}
                </Popup>
            </Marker>
        ))}
    </MapContainer>
</div>

            </div>
        </div>
    );
};

export default SupplierGeoMap;
