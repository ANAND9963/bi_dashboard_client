import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupplierGeoTable = () => {
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/suppliers/geo')
            .then(res => setRows(res.data));
    }, []);

    const filtered = rows.filter(r =>
        r.supplierName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 rounded-xl bg-[#1e1e1e] text-white shadow-md">
            <h3 className="text-lg font-semibold mb-3">Supplier Geography</h3>
            <input
                type="text"
                placeholder="Search supplier..."
                className="p-2 mb-3 w-full rounded bg-gray-800 text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="overflow-x-auto">
                <table className="w-full text-left table-auto border-collapse">
                    <thead>
                    <tr className="border-b border-gray-600">
                        <th className="p-2">Supplier</th>
                        <th className="p-2">Continent</th>
                        <th className="p-2">Country</th>
                        <th className="p-2">City</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((r, i) => (
                        <tr key={i} className="border-b border-gray-700">
                            <td className="p-2">{r.supplierName}</td>
                            <td className="p-2">{r.continent}</td>
                            <td className="p-2">{r.countryName}</td>
                            <td className="p-2">{r.cityName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupplierGeoTable;
