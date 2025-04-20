import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PORT = process.env.REACT_APP_API_URL;

const TopSellingItems = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');

    useEffect(() => {
        axios.get(`${PORT}api/warehouse-analytics/top-selling`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            }
        }).then(res => {
            setItems(res.data);
            setFilteredItems(res.data);
        }).catch(err => {
            if (err.response) {
                console.error("Error Response:", err.response.status, err.response.data);
            } else {
                console.error("Network Error:", err.message);
            }
        });
    }, []);

    const handleFilterChange = (value) => {
        setSelectedItem(value);
        if (value === '') {
            setFilteredItems(items);
        } else {
            const filtered = items.filter(item =>
                item.stockItemName.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    };

    return (
        <div className="bg-transparent text-white p-6 rounded-xl  mb-6">

            {/* Top Section */}
            <div className="mb-6">
                <h2 className="text-3xl text-gray-900 font-bold mb-2 text-center">Warehouse Analytics</h2>
                <p className="text-sm text-gray-600">Visualize top-selling items based on total revenue and quantity sold.</p>
            </div>

            {/* Dropdown */}
            <h3 className="text-lg text-black font-semibold mb-2">Top Selling Items by Revenue</h3>
            <select
                value={selectedItem}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="mb-4 p-2 w-full sm:w-1/2 bg-[#334155] text-white rounded border border-gray-600 focus:outline-none"
            >
                <option value="">All Items</option>
                {items.map((item, i) => (
                    <option key={i} value={item.stockItemName}>{item.stockItemName}</option>
                ))}
            </select>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-700 table-auto rounded-lg overflow-hidden">
                    <thead className="bg-[#0f172a] text-white">
                        <tr>
                            <th className="p-4 border border-gray-700">Stock Item</th>
                            <th className="p-4 border border-gray-700">Quantity Sold</th>
                            <th className="p-4 border border-gray-700">Total Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, i) => (
                            <tr
                                key={i}
                                className={`${i % 2 === 0 ? 'bg-[#1e293b]' : 'bg-[#2e3b51]'} hover:bg-[#3b4a64] transition-colors`}
                            >
                                <td className="p-4 border border-gray-700">{item.stockItemName}</td>
                                <td className="p-4 border border-gray-700">{item.totalQuantitySold}</td>
                                <td className="p-4 border border-gray-700">${item.totalRevenue.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopSellingItems;
