import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';

const formatYAxis = (value) => `${(value / 1000).toFixed(1)}K`;

const SupplierTransactionChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={400}>
        <BarChart
            data={data}
            barCategoryGap="20%"
            margin={{ top: 20, right: 30, left: 10, bottom: 70 }}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} stroke="#ccc" />
            <YAxis tickFormatter={formatYAxis} stroke="#ccc" />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="totalAmountExcludingTax" stackId="a" fill="#42A5F5" animationDuration={800} />
            <Bar dataKey="totalTaxAmount" stackId="a" fill="#FFA726" animationDuration={800} />
        </BarChart>
    </ResponsiveContainer>
);

export default SupplierTransactionChart;
