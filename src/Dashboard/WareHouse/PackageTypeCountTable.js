import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PackageTypeItemCounts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/warehouse-analytics/package-type-usage')
            .then(res => setData(res.data))
            .catch(err => console.error('Error fetching package type stats:', err));
    }, []);


    return (
        <div className="p-4 mb-6 !text-white">
            <h3 className="text-2xl font-bold mb-4 !text-white">Stock Items by Package Type</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.map((pkg, i) => (
                    <div
                        key={i}
                        className="bg-[#1e1e1ecc] backdrop-blur-md text-white p-6 rounded-lg shadow-lg border border-gray-700"
                    >
                        <h4 className="text-lg font-semibold">{pkg.packageTypeName}</h4>
                        <p className="text-gray-400 mt-1">Item Count</p>
                        <p className="text-3xl font-bold text-blue-400 mt-1">{pkg.stockItemCount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PackageTypeItemCounts;
