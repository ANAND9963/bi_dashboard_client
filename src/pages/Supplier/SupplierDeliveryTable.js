import React, { useEffect, useState } from 'react';
import axios from 'axios';
const PORT=process.env.REACT_APP_API_URL;
const SupplierDeliveryTable = () => {
    const [data, setData] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState('');

    useEffect(() => {
         axios.get(`${PORT}api/suppliers/delivery-methods`,{
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
                // "Authorization": "Bearer YOUR_TOKEN_HERE" // Uncomment if using auth
            }}).then(res => setData(res.data)).catch(err => {
                if (err.response) {
                    console.error(" Error Response:", err.response.status, err.response.data);
                } else {
                    console.error(" Network Error:", err.message);
                }
            }, [])
    }, []);

    const deliveryMethods = [...new Set(data.map(d => d.deliveryMethodName))];

    const filtered = selectedMethod
        ? data.filter(d => d.deliveryMethodName === selectedMethod)
        : data;

    return (
        <div className="p-4 rounded-xl bg-[#1e1e1e] text-white shadow-md">
            <h3 className="text-lg font-semibold mb-3 !text-white">Supplier Delivery Methods</h3>

            <select
                className="w-full p-2 mb-4 rounded bg-[#2c2c2c] !text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
            >
                <option value="">All Delivery Methods</option>
                {deliveryMethods.map((method, i) => (
                    <option key={i} value={method} className="!text-white bg-[#2c2c2c]">
                        {method}
                    </option>
                ))}
            </select>

            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                    <thead className="!text-white">
                    <tr className="border-b border-gray-600">
                        <th className="p-2 !text-white">Supplier</th>
                        <th className="p-2 !text-white">Delivery Method</th>
                    </tr>
                    </thead>
                    <tbody className="!text-white">
                    {filtered.map((d, i) => (
                        <tr key={i} className="border-b border-gray-700">
                            <td className="p-2 !text-white">{d.supplierName}</td>
                            <td className="p-2 !text-white">{d.deliveryMethodName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupplierDeliveryTable;
