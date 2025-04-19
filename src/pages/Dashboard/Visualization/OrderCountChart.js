import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';
const formatLabel = (value) =>
    value >= 1000 ? (value / 1000).toFixed(0) + "K" : value;
  
const PORT = process.env.REACT_APP_API_URL;

const OrderCountChart = () => {
    const [startDate, setStartDate] = useState('2013-01-01');
    const [endDate, setEndDate] = useState('2013-12-31');
    const [chartData, setChartData] = useState([]);

    const fetchData = async (start, end) => {
        try {
            const response = await axios.get(`${PORT}api/purchase-orders/monthly`, {
                params: {
                    startDate: start,
                    endDate: end
                },
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                }
            });

            const formattedData = response.data.map(item => ({
                name: `${item.orderYear}-${item.orderMonth.toString().padStart(2, '0')}`,
                count: item.orderCount
            }));

            setChartData(formattedData);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    useEffect(() => {
        fetchData(startDate, endDate);
    }, [startDate, endDate]);

    const handleFetchClick = () => {
        fetchData(startDate, endDate);
    };

    return (
        <div className="p-6 font-sans bg-gray-900 text-white">
            {/* Heading */}
            <h2 className="text-center text-xl font-semibold  mb-4">Monthly Orders Bar Chart</h2>

            {/* Date Pickers and Fetch Button
            <div className="flex gap-4 justify-center mb-4">
                <div>
                    <label className="block text-sm ">Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="px-3 py-2 text-sm border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm ">End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="px-3 py-2 text-sm border rounded-md"
                    />
                </div>
                <button
                    onClick={handleFetchClick}
                    className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Fetch
                </button>
            </div> */}

            {/* Bar Chart */}
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        tick={{ fill: "#fff" }}
                    />
                    <YAxis
                                    tick={{ fill: "#fff" }}
                                    label={{
                                      value: "Revenue (K) & Orders",
                                      angle: -90,
                                      position: "insideLeft",
                                      fill: "#fff",
                                    }}    tickFormatter={formatLabel}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#4CAF50" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OrderCountChart;
