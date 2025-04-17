import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ✅ Fix missing icons by importing them
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

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
        axios.get('http://localhost:8080/api/suppliers/locations')
            .then(res => {
                const valid = res.data.filter(loc => loc.latitude && loc.longitude);
                setLocations(valid);
            });
    }, []);

    const supplierNames = [...new Set(locations.map(loc => loc.supplierName))];
    const filtered = selectedSupplier
        ? locations.filter(loc => loc.supplierName === selectedSupplier)
        : locations;

    return (
        <div className="bg-[#1e1e1ee0] text-white rounded-xl shadow-md p-4 mb-6 w-full max-w-full">
            <h3 className="text-lg font-semibold mb-3">Supplier Map</h3>

            <select
                className="p-2 mb-4 w-full rounded bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
            >
                <option value="">All Suppliers</option>
                {supplierNames.map((name, i) => (
                    <option key={i} value={name}>{name}</option>
                ))}
            </select>

            <div className="rounded overflow-hidden border border-gray-600" style={{ width: '100%', height: '400px' }}>
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
    );
};

export default SupplierGeoMap;
