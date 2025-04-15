import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VehicleTempViolations = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/warehouse-analytics/vehicle-temperature-alerts')
            .then(res => setRecords(res.data));
    }, []);

    return (
        <div className="bg-white/90 rounded-xl shadow-md p-4 mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Vehicle Temp Violations</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-800">
                    <thead className="border-b border-gray-300">
                    <tr>
                        <th className="p-2">Vehicle</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Temperature (°C)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map((r, i) => (
                        <tr key={i} className="border-b border-gray-200">
                            <td className="p-2">{r.vehicleRegistration}</td>
                            <td className="p-2">{r.recordedWhen}</td>
                            <td className="p-2 text-red-600">{r.temperature}°C</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VehicleTempViolations;
