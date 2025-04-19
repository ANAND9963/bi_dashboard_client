
        import React, { useEffect, useState } from 'react';
        import axios from 'axios';
        const PORT=process.env.REACT_APP_API_URL;
        const ColdRoomTemperatureStats = () => {
            const [data, setData] = useState([]);

            useEffect(() => {
                axios
                    .get(`${PORT}api/warehouse-analytics/cold-room-temperatures`)
                    .then((res) => setData(res.data))
                    .catch(err => {
                        if (err.response) {
                            console.error(" Error Response:", err.response.status, err.response.data);
                        } else {
                            console.error(" Network Error:", err.message);
                        }
                    }, [])
            }, []);

            return (
                <div className="p-4">
                    <h3 className="text-xl font-bold  mb-4 text-center">
                        Cold Room Temperature Statistics
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {data.map((entry, i) => (
                            <div
                                key={i}
                                className="backdrop-blur-md bg-black/70 text-white-800 p-5 rounded-xl shadow-md border border-gray-200"
                            >
                                <h4 className="text-lg font-bold text-blue-800 mb-2">
                                    Sensor #{entry.sensorNumber}
                                </h4>
                                <p className="text-sm">
                                    <strong>Date:</strong> {entry.recordedDate}
                                </p>
                                <p className="text-sm">
                                    <strong>Min Temp:</strong>{' '}
                                    {entry.minTemp !== null ? `${entry.minTemp} °C` : 'N/A'}
                                </p>
                                <p className="text-sm">
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
