import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const PORT = process.env.REACT_APP_API_URL;

// Color palette for chart slices
const COLORS = ['#42A5F5', '#66BB6A', '#FFA726', '#BA68C8', '#FF7043', '#26A69A'];

// ✅ White text label renderer
const renderCustomizedLabel = ({ name, percent, x, y }) => (
  <text
    x={x}
    y={y}
    fill="#ffffff"
    textAnchor="middle"
    dominantBaseline="central"
    fontSize={12}
  >
    {`${name} (${(percent * 100).toFixed(0)}%)`}
  </text>
);

const SupplierCategoryDonutChart = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${PORT}api/suppliers/count-by-category`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
          // "Authorization": "Bearer YOUR_TOKEN_HERE"
        }
      });
      const formatted = res.data.map(item => ({
        name: item.supplierCategoryName,
        value: item.supplierCount
      }));
      setData(formatted);
    } catch (err) {
      console.error('Error fetching supplier category data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 font-sans bg-gray-900 text-white">
     <h2 className="text-center text-xl font-semibold  mb-4">🧾 Supplier Category Breakdown</h2>
    
          <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={90}
            outerRadius={140}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            animationBegin={200}
            animationDuration={1200}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SupplierCategoryDonutChart;
