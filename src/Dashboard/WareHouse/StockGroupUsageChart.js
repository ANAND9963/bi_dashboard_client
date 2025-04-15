import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StockGroupUsageChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/warehouse-analytics/stock-group-usage')
            .then(res => setData(res.data));
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
