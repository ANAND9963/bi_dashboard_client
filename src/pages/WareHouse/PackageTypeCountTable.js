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
        <div className="bg-transparent text-white p-6 rounded-xl  mb-6">
        <div className="mb-6">
                    <h2 className="text-3xl text-gray-900 font-bold mb-2 text-center">
                   Stock Items by Package Type </h2></div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                   {data.map((pkg, i) => (
                    <div
                        key={i}
                        className="backdrop-blur-md bg-[#334155] text-white p-5 rounded-xl shadow-md border border-gray-200"
                              >
                        <h4 className="text-lg font-bold text-white mb-2 font-semibold">{pkg.packageTypeName}</h4>
                        {/* <p className="text-white mt-1">Item Count</p>  */}
                        <p className="text-3xl font-bold text-blue-400 mt-1">{pkg.stockItemCount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PackageTypeItemCounts;
