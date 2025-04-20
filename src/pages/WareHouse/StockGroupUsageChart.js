import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const PORT = process.env.REACT_APP_API_URL;

const StockGroupUsageChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${PORT}api/warehouse-analytics/stock-group-usage`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            }
        }).then(res => setData(res.data)).catch(err => {
            if (err.response) {
                console.error("Error Response:", err.response.status, err.response.data);
            } else {
                console.error("Network Error:", err.message);
            }
        });
    }, []);

    return (
        <div className="bg-transparent text-white p-6 rounded-xl  mb-6">
        <div className="mb-6">
                    <h2 className="text-3xl text-gray-900 font-bold mb-2 text-center">
                   Stock Group Usage</h2>
            </div>
            <div className="w-full h-[80%] px-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis
                            dataKey="stockGroupName"
                            tick={{ fill: '#cbd5e1', fontSize: 12,fill:"#3b82f6" }}
                            angle={-30}
                            textAnchor="end"
                        />
                        <YAxis tick={{ fill: '#60a5fa', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e2939', borderColor: '#475569', color: '#fff' }}
                            labelStyle={{ color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="itemUsageCount" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={60} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StockGroupUsageChart;
