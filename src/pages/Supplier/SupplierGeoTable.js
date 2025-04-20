import React, { useEffect, useState } from 'react';
import axios from 'axios';
const PORT=process.env.REACT_APP_API_URL;
const SupplierGeoTable = () => {
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get(`${PORT}api/suppliers/geo`,{
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
                // "Authorization": "Bearer YOUR_TOKEN_HERE" // Uncomment if using auth
            }}).then(res => setRows(res.data)).catch(err => {
                if (err.response) {
                    console.error(" Error Response:", err.response.status, err.response.data);
                } else {
                    console.error(" Network Error:", err.message);
                }
            }, [])
    }, []);

    const filtered = rows.filter(r =>
        r.supplierName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-transparent text-white p-6 rounded-xl  mb-6">

            {/* Top Section */}
            <div className="mb-6">
            <h2 className="text-3xl text-gray-900 font-bold mb-2 text-center">Supplier Geography</h2>
            </div>
            <input
                type="text"
                placeholder="Search supplier..."
                className="mb-4 p-2 w-full sm:w-1/2 bg-[#334155] text-white rounded border border-gray-600 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
           <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-700 table-auto rounded-lg overflow-hidden">
                    <thead className="bg-[#0f172a] text-white">
                        <tr>
                             <th className="p-4 border border-gray-700">Supplier</th>
                        <th className="p-4 border border-gray-700">Continent</th>
                        <th className="p-4 border border-gray-700">Country</th>
                        <th className="p-4 border border-gray-700">City</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((r, i) => (
                        <tr  key={i}
                        className={`${i % 2 === 0 ? 'bg-[#1e293b]' : 'bg-[#2e3b51]'} hover:bg-[#3b4a64] transition-colors`}
                >
                            <td className="p-4 border border-gray-700">{r.supplierName}</td>
                            <td className="p-4 border border-gray-700">{r.continent}</td>
                            <td className="p-4 border border-gray-700">{r.countryName}</td>
                            <td className="p-4 border border-gray-700">{r.cityName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupplierGeoTable;
