import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const PORT=process.env.REACT_APP_API_URL;
const StockGroupUsageChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${PORT}api/warehouse-analytics/stock-group-usage`,{
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
                // "Authorization": "Bearer YOUR_TOKEN_HERE" // Uncomment if using auth
            }}).then(res => setData(res.data)).catch(err => {
                if (err.response) {
                    console.error(" Error Response:", err.response.status, err.response.data);
                } else {
                    console.error(" Network Error:", err.message);
                }
            }, []).catch(err => {
                if (err.response) {
                    console.error(" Error Response:", err.response.status, err.response.data);
                } else {
                    console.error(" Network Error:", err.message);
                }
            }, [])
    }, []);

    return (
        <div className="bg-white/90 rounded-xl shadow-md p-4 mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Stock Group Usage</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="stockGroupName" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="itemUsageCount" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StockGroupUsageChart;
