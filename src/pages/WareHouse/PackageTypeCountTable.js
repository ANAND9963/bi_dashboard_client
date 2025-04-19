import React, { useEffect, useState } from 'react';
import axios from 'axios';
const PORT=process.env.REACT_APP_API_URL;
const PackageTypeItemCounts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${PORT}api/warehouse-analytics/package-type-usage`,{
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
                // "Authorization": "Bearer YOUR_TOKEN_HERE" // Uncomment if using auth
            }})
            .then(res => setData(res.data))
            .catch(err => {
                if (err.response) {
                    console.error(" Error Response:", err.response.status, err.response.data);
                } else {
                    console.error(" Network Error:", err.message);
                }
            }, [])
    }, []);

    return (
        <div className="p-4 mb-6 text-black">
            <h3 className="text-2xl font-bold mb-4 ">Stock Items by Package Type</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.map((pkg, i) => (
                    <div
                        key={i}
                        className="bg-[#1e1e1ecc] backdrop-blur-md text-white p-6 rounded-lg shadow-lg border border-gray-700"
                    >
                        <h4 className="text-lg font-semibold">{pkg.packageTypeName}</h4>
                        {/* <p className="text-white mt-1">Item Count</p>  */}
                        <p className="text-3xl font-bold text-blue-400 mt-1">{pkg.stockItemCount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PackageTypeItemCounts;
