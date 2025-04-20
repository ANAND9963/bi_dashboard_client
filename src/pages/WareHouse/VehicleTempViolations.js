import React, { useEffect, useState } from 'react';
import axios from 'axios';
const PORT=process.env.REACT_APP_API_URL;
const VehicleTempViolations = () => {
    const [records, setRecords] = useState([]);

    useEffect(() =>{axios.get(`${PORT}api/warehouse-analytics/vehicle-temperature-alerts`,{
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
                // "Authorization": "Bearer YOUR_TOKEN_HERE" // Uncomment if using auth
            }}).then(res => {console.log("records",records);setRecords(res.data)}).catch(err => {
                if (err.response) {
                    console.error(" Error Response:", err.response.status, err.response.data);
                } else {
                    console.error(" Network Error:", err.message);
                }
            }, [])
    }, []);


    return (
        <div className="bg-transparent text-white p-6 rounded-xl  mb-6">
    <div className="mb-6">
                <h2 className="text-3xl text-gray-900 font-bold mb-2 text-center">Vehicle Temp Violations</h2>
                    </div>
                    <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-700 table-auto rounded-lg overflow-hidden">
                    <thead className="bg-[#0f172a] text-white">
                        <tr>
                            <th className="p-4 border border-gray-700">Vehicle</th>
                      <th className="p-4 border border-gray-700">Date</th>
                      <th className="p-4 border border-gray-700">Temperature (°C)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map((r, i) => (
                         <tr
                         key={i}
                         className={`${i % 2 === 0 ? 'bg-[#1e293b]' : 'bg-[#2e3b51]'} hover:bg-[#3b4a64] transition-colors`}
                     >
                           <td className="p-4 border border-gray-700">{r.vehicleRegistration}</td>
                             <td className="p-4 border border-gray-700">{r.recordedWhen}</td>
                            <td className="p-4 border border-gray-700 text-red-600">{r.temperature}°C</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VehicleTempViolations;
