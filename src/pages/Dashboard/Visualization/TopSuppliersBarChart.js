import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const PORT = process.env.REACT_APP_API_URL;

const TopSuppliersBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const [dateRange] = useState({
    startDate: '2013-01-01',
    endDate: '2017-12-31'
  });
  const formatLabel = (value) =>
    value >= 1000 ? (value / 1000).toFixed(0) + "K" : value;
  
  const fetchSupplierList = async () => {
    try {
      const res = await axios.get(`${PORT}api/suppliers/list`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
      });
      setSuppliers(res.data);
    } catch (err) {
      console.error('Failed to fetch suppliers:', err);
    }
  };

  useEffect(() => {
    fetchSupplierList();
  }, []);

  const fetchChartData = useCallback(async () => {
    try {
      const params = {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      };
      if (selectedSupplierId) params.supplierId = selectedSupplierId;

      const res = await axios.get(`${PORT}api/supplier-analytics/top-suppliers`, {
        params,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
      });

      const formatted = res.data.map((item) => ({
        ...item,
        name: item.supplierName,
        totalTransactionAmount: item.totalTransactionAmount / 1000 // Convert to 'K'
      }));

      setChartData(formatted);
    } catch (err) {
      console.error('Failed to fetch chart data:', err);
    }
  }, [selectedSupplierId, dateRange]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  return (
    <div className="p-6 font-sans bg-gray-900 text-white">
     <h2 className="text-center text-xl font-semibold  mb-4">📊 Top 10 Suppliers by Order Count</h2>

      {/* <div className="mb-4">
        <label className="mr-2">Select Supplier:</label>
        <select
          className="bg-gray-800 text-white border border-gray-600 rounded p-1"
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
      </div> */}

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="name"
            angle={-30}
            textAnchor="end"
            interval={0}
            stroke="#ccc"
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#ccc"
            tick={{ fill: "#ccc" }}
            label={{ value: 'Order Count', angle: -90, position: 'insideLeft', fill: "#ccc" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#ccc"
            tick={{ fill: "#ccc" }}
            tickFormatter={(value) => `${value.toFixed(1)}K`}
            label={{ value: 'Revenue (K)', angle: -90, position: 'insideRight', fill: "#ccc" }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", border: "none", color: "#fff" }}
            formatter={(value, name) => {
              if (name === 'totalTransactionAmount') {
                return [`$${value.toFixed(1)}K`, 'Revenue'];
              }
              return [value, 'Orders'];
            }}
          />
          <Legend wrapperStyle={{ color: 'white' }} />
          <Bar yAxisId="left" dataKey="orderCount" fill="#42A5F5" name="Order Count" />
          <Bar yAxisId="right" dataKey="totalTransactionAmount" fill="#FFA726" name="Revenue (K)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopSuppliersBarChart;
