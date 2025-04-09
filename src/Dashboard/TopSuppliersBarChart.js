import React, { useEffect, useState, useCallback } from 'react'; // ✅ fixed import
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const TopSuppliersBarChart = () => {
    const [chartData, setChartData] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplierId, setSelectedSupplierId] = useState('');
    const [dateRange] = useState({
        startDate: '2013-01-01',
        endDate: '2017-12-31'
    });

    // ✅ fetch supplier list
    const fetchSupplierList = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/suppliers/list');
            setSuppliers(res.data);
        } catch (err) {
            console.error('Failed to fetch suppliers:', err);
        }
    };

    // ✅ call this once on mount
    useEffect(() => {
        fetchSupplierList();
    }, []);

    // ✅ memoized chart fetcher
    const fetchChartData = useCallback(async () => {
        try {
            const params = {
                startDate: dateRange.startDate,
                endDate: dateRange.endDate
            };
            if (selectedSupplierId) params.supplierId = selectedSupplierId;

            const res = await axios.get('http://localhost:8080/api/supplier-analytics/top-suppliers', { params });

            const formatted = res.data.map((item) => ({
                ...item,
                name: item.supplierName,
                totalTransactionAmount: item.totalTransactionAmount / 1000 // K format
            }));

            setChartData(formatted);
        } catch (err) {
            console.error('Failed to fetch chart data:', err);
        }
    }, [selectedSupplierId, dateRange]);

    // ✅ single useEffect to call chart fetcher
    useEffect(() => {
        fetchChartData();
    }, [fetchChartData]);


    return (
        <div style={{ padding: '1rem', color: 'white' }}>
            <h3>Top 10 Suppliers by Order Count</h3>

            <div style={{ marginBottom: '1rem' }}>
                <label>Select Supplier: </label>
                <select
                    value={selectedSupplierId}
                    onChange={(e) => setSelectedSupplierId(e.target.value)}
                >
                    <option value="">All Suppliers</option>
                    {suppliers.map((supplier) => (
                        <option key={supplier.supplierId} value={supplier.supplierId}>
                            {supplier.supplierName}
                        </option>
                    ))}
                </select>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} stroke="#ccc" />
                    <YAxis
                        yAxisId="left"
                        orientation="left"
                        stroke="#ccc"
                        tickFormatter={(value) => `${value}`}
                        label={{ value: 'Order Count', angle: -90, position: 'insideLeft' }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#ccc"
                        tickFormatter={(value) => `${value.toFixed(1)}K`}
                        label={{ value: 'Revenue (K)', angle: -90, position: 'insideRight' }}
                    />
                    <Tooltip
                        formatter={(value, name) => {
                            if (name === 'totalTransactionAmount') {
                                return [`$${value.toFixed(1)}K`, 'Revenue'];
                            }
                            return [value, 'Orders'];
                        }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="orderCount" fill="#42A5F5" name="Order Count" />
                    <Bar yAxisId="right" dataKey="totalTransactionAmount" fill="#FFA726" name="Revenue (K)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

};

export default TopSuppliersBarChart;
