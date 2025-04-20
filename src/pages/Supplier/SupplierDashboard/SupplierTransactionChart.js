import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';

const formatYAxis = (value) => `${(value / 1000).toFixed(1)}K`;

const SupplierTransactionChart = ({ data }) => (
    <div className="w-full h-[80%] px-4">
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
            data={data}
            barCategoryGap="20%"
            margin={{ top: 20, right: 30, left: 10, bottom: 70 }}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name"    tick={{ fill: '#cbd5e1', fontSize: 12,fill:"#3b82f6" }}
                          angle={-45} textAnchor="end" height={70} stroke="#ccc" />
            <YAxis tickFormatter={formatYAxis} tick={{ fill: '#60a5fa', fontSize: 12 }}stroke="#ccc" />
            <Tooltip  contentStyle={{ backgroundColor: '#1e2939', borderColor: '#475569' }}
                          formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="totalAmountExcludingTax" stackId="a" fill="#42A5F5" animationDuration={800} />
            <Bar dataKey="totalTaxAmount" stackId="a" fill="#FFA726" animationDuration={800} />
        </BarChart>
    </ResponsiveContainer>
    </div>
);

export default SupplierTransactionChart;
