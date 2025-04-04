import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import axiosInstance from "../api/axiosInstance";

// Function to format numbers with K/M suffixes
const formatLabel = (value) => {
  if (value >= 1000) {
    return (value / 1000).toFixed(0) + "K";  // for thousands
  }
  return value; // return as-is for small values
};

const RevenueChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/stats/quarterly").then((res) => {
      const formatted = res.data.map(item => ({
        name: `${item.year} Q${item.quarter}`,
        revenue: item.revenue / 1000, // 💰 Convert to thousands (K)
        orders: item.orders,
        aov: item.avgOrderValue
      }));
      setData(formatted);
    });
  }, []);

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h2 className="text-xl font-semibold mb-4 text-white">📊 Quarterly Business KPIs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 📈 Revenue & Orders */}
        <div>
          <h3 className="text-white text-lg mb-2">💰 Revenue & 📦 Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fill: "#fff" }} />
              <YAxis
                tick={{ fill: "#fff" }}
                label={{
                  value: "Revenue (K) & Orders",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#fff"
                }}
                tickFormatter={formatLabel} // Format Y-axis labels in 'K'
              />
              <Tooltip
                formatter={(value) => value.toFixed(0) + "K"} // Format tooltip values in 'K'
              />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" name="Revenue (K)" />
              <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 📊 AOV Chart */}
        <div>
          <h3 className="text-white text-lg mb-2">📦 Avg Order Value</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fill: "#fff" }} />
              <YAxis
                tick={{ fill: "#fff" }}
                label={{
                  value: "Avg Order Value",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#fff"
                }}
                tickFormatter={formatLabel} // Format Y-axis labels in 'K'
              />
              <Tooltip
                formatter={(value) => value.toFixed(0) + "K"} // Format tooltip values in 'K'
              />
              <Legend />
              <Bar dataKey="aov" fill="#ffc658" name="Avg Order Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
