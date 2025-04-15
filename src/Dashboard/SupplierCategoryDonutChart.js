import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

// Color palette for chart slices
const COLORS = ['#42A5F5', '#66BB6A', '#FFA726', '#BA68C8', '#FF7043', '#26A69A'];

// Render both category name + percentage inside slices
const renderCustomizedLabel = ({ name, percent }) =>
    `${name} (${(percent * 100).toFixed(0)}%)`;

const SupplierCategoryDonutChart = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/suppliers/count-by-category');
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
        <div
            style={{
                background: '#1e1e1e',
                padding: '1rem',
                borderRadius: '12px',
                color: 'white',
                boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                marginTop: '1rem'
            }}
        >
            <h3>Supplier Category Breakdown</h3>
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
