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
        <div className="bg-transparent text-white p-6 rounded-xl  mb-6">

        {/* Top Section */}
        <div className="mb-6">
            <h2 className="text-3xl text-gray-900 font-bold mb-2 text-center">Supplier Delivery Methods</h2>
</div>
            <select
                 className="mb-4 p-2 w-full sm:w-1/2 bg-[#334155] text-white rounded border border-gray-600 focus:outline-none"
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
                <table className="w-full text-left border border-gray-700 table-auto rounded-lg overflow-hidden">
                    <thead className="bg-[#0f172a] text-white">
                        <tr>
                        <th className="p-4 border border-gray-700">Supplier</th>
                       <th className="p-4 border border-gray-700">Delivery Method</th>
                    </tr>
                    </thead>
                    <tbody className="!text-white">
                    {filtered.map((d, i) => (
                        <tr key={i}   className={`${i % 2 === 0 ? 'bg-[#1e293b]' : 'bg-[#2e3b51]'} hover:bg-[#3b4a64] transition-colors`}
                        >
                            <td className="p-4 border border-gray-700">{d.supplierName}</td>
                            <td className="p-4 border border-gray-700">{d.deliveryMethodName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupplierDeliveryTable;
