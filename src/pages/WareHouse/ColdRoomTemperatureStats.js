
        import React, { useEffect, useState } from 'react';
        import axios from 'axios';
        const PORT=process.env.REACT_APP_API_URL;
        const ColdRoomTemperatureStats = () => {
            const [data, setData] = useState([]);

            useEffect(() => {
                axios
                    .get(`${PORT}api/warehouse-analytics/cold-room-temperatures`,{headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true"
                    }})
                    .then((res) => res?.data? setData(res.data):setData([]) )
                    .catch(err => {
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
                    <h2 className="text-3xl text-gray-900 font-bold mb-2 text-center">
                        Cold Room Temperature Statistics
                    </h2></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {data.map((entry, i) => (
                            <div
                                key={i}
                                className="backdrop-blur-md bg-[#334155] text-white p-5 rounded-xl shadow-md border border-gray-200"
                            >
                                <h4 className="text-lg font-semibold text-white mb-2">
                                    Sensor #{entry.sensorNumber}
                                </h4>
                                <p className="text-sm text-blue-400">
                                    <strong>Date:</strong> {entry.recordedDate}
                                </p>
                                <p className="text-sm text-blue-400">
                                    <strong>Min Temp:</strong>{' '}
                                    {entry.minTemp !== null ? `${entry.minTemp} °C` : 'N/A'}
                                </p>
                                <p className="text-sm text-blue-400">
                                    <strong>Max Temp:</strong>{' '}
                                    {entry.maxTemp !== null ? `${entry.maxTemp} °C` : 'N/A'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        export default ColdRoomTemperatureStats;
