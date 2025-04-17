import React, { useEffect, useState } from 'react';
import axios from 'axios';
const PORT=process.env.REACT_APP_API_URL;
const TopSellingItems = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    useEffect(() => {
        axios.get(`${PORT}api/warehouse-analytics/top-selling`)
            .then(res => {
                setItems(res.data);
                setFilteredItems(res.data);
            });}, []);
    const handleFilterChange = (value) => {
        setSelectedItem(value);
        if (value === '') {
            setFilteredItems(items);
        } else {
            const filtered = items.filter(item => item.stockItemName.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    };
    return (
        <div className="bg-[#1e1e1e] !text-white p-4 rounded-xl shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4 !text-white">Top Selling Items by Revenue</h3>
            <select
                value={selectedItem}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="mb-4 p-2 w-full sm:w-1/2 bg-[#2b2b2b] text-white rounded border border-gray-600"
            >
                <option value="">All Items</option>
                {items.map((item, i) => (
                    <option key={i} value={item.stockItemName}>{item.stockItemName}</option>
                ))}
            </select>
            <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-700 table-auto">
                    <thead className="bg-[#2c2c2c]">
                    <tr>
                        <th className="p-3 border border-gray-700">Stock Item</th>
                        <th className="p-3 border border-gray-700">Quantity Sold</th>
                        <th className="p-3 border border-gray-700">Total Revenue</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredItems.map((item, i) => (
                        <tr key={i} className="hover:bg-[#292929]">
                            <td className="p-3 border border-gray-700">{item.stockItemName}</td>
                            <td className="p-3 border border-gray-700">{item.totalQuantitySold}</td>
                            <td className="p-3 border border-gray-700">${item.totalRevenue.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default TopSellingItems;
