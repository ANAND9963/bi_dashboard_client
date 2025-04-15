import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';

const OrderCountChart = () => {
    const [startDate, setStartDate] = useState('2013-01-01');
    const [endDate, setEndDate] = useState('2013-12-31');
    const [chartData, setChartData] = useState([]);

    const fetchData = async (start, end) => {
        try {
            const response = await axios.get('http://localhost:8080/api/purchase-orders/monthly', {
                params: {
                    startDate: start,
                    endDate: end
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

    // 🔥 Fetch 2013 data on initial load
    useEffect(() => {
        fetchData(startDate, endDate);
    }, [startDate, endDate]);

    const handleFetchClick = () => {
        fetchData(startDate, endDate);
    };

    return (
        <div className="p-4">
            <h2>Monthly Orders Bar Chart</h2>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                    <label>Start Date: </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>End Date: </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                </div>
                <button onClick={handleFetchClick}>Fetch</button>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#4CAF50" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OrderCountChart;
