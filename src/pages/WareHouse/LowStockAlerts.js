
    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    const PORT=process.env.REACT_APP_API_URL;
    const LowStockAlerts = () => {
        const [items, setItems] = useState([]);

        useEffect(() => {
            axios.get(`${PORT}api/warehouse-analytics/stock-shortages`,{
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                    // "Authorization": "Bearer YOUR_TOKEN_HERE" // Uncomment if using auth
                }})
                .then(res => setItems(res.data))
                .catch(err => {
                    if (err.response) {
                        console.error(" Error Response:", err.response.status, err.response.data);
                    } else {
                        console.error(" Network Error:", err.message);
                    }
                }, [])
        }, []);

        return (
            <div className="bg-[#1e1e1ee0] backdrop-blur-md text-white p-4 rounded-xl shadow-md mb-6">
                <h3 className="text-xl font-bold mb-4 text-white">Low Stock Alerts</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="border-b border-gray-500">
                        <tr>
                            <th className="p-2">Stock Item</th>
                            <th className="p-2">On Hand</th>
                            <th className="p-2">Reorder Level</th>
                            <th className="p-2">Target Level</th>
                            <th className="p-2 text-red-400">Shortage</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, i) => (
                            <tr key={i} className="border-b border-gray-700 hover:bg-[#2a2a2a] transition">
                                <td className="p-2">{item.itemName}</td>
                                <td className="p-2">{item.quantityOnHand}</td>
                                <td className="p-2">{item.reorderLevel}</td>
                                <td className="p-2">{item.targetStockLevel}</td>
                                <td className="p-2 font-semibold text-red-400">{item.shortage}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    export default LowStockAlerts;
