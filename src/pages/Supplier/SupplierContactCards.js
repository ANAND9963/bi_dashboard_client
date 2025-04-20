import React, { useEffect, useState } from 'react';
import axios from 'axios';
const PORT = process.env.REACT_APP_API_URL;
const SupplierContactCards = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 6;

    useEffect(() => {
        axios.get(`${PORT}api/suppliers/contacts`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
                // "Authorization": "Bearer YOUR_TOKEN_HERE" // Uncomment if using auth
            },

        })
            .then(res =>
                setContacts(res.data)
            )
            .catch(err => {
                if (err.response) {
                    console.error(" Error Response:", err.response.status, err.response.data);
                } else {
                    console.error(" Network Error:", err.message);
                }
            }, [])
    })

    const supplierNames = [...new Set(contacts?.map(c => c.supplierName))];

    const filtered = selectedSupplier
        ? contacts?.filter(c => c.supplierName === selectedSupplier)
        : contacts;

    const totalPages = Math.ceil(filtered.length / pageSize);
    const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="bg-transparent text-white p-6 rounded-xl  mb-6">

             {/* Dropdown */}
            <select
                 className="mb-4 p-2 w-full sm:w-1/2 bg-[#334155] text-white rounded border border-gray-600 focus:outline-none"
                 value={selectedSupplier}
                onChange={(e) => {
                    setSelectedSupplier(e.target.value);
                    setCurrentPage(1);
                }}
            >
                <option value="">All Suppliers</option>
                {supplierNames.map((name, i) => (
                    <option key={i} value={name} className="bg-[#2c2c2c] text-white">
                        {name}
                    </option>
                ))}
            </select>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                         {paginated.map((c, i) => {
                    const globalIndex = (currentPage - 1) * pageSize + i;
                    const isExpanded = expandedIndex === globalIndex;

                    return (
                        <div
                            key={globalIndex}
                            className="backdrop-blur-md bg-[#334155] text-white p-5 rounded-xl shadow-md border border-gray-200"
                            onClick={() => toggleExpand(globalIndex)}
                        >
                            <h4 className="text-lg font-semibold text-white mb-2">{c.supplierName}</h4>
                            {isExpanded && (
                                <div className="mt-2 space-y-1 text-sm text-white">
                                    <p>
                                        <span className="font-semibold text-white">Contact:</span>{' '}
                                        <span className="text-white">{c.contactPerson}</span>
                                    </p>
                                    <p>
                                        <span className="font-semibold text-white">Email:</span>{' '}
                                        <span className="text-white">{c.emailAddress}</span>
                                    </p>
                                    <p>
                                        <span className="font-semibold text-white">Phone:</span>{' '}
                                        <span className="text-white">{c.phoneNumber}</span>
                                    </p>
                                </div>
                            )}
                            <p className="mt-2 text-blue-400 text-sm">
                                {isExpanded ? 'Click to collapse' : 'Click to expand'}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-2">
                    <button
                        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-40"
                        onClick={() => setCurrentPage((p) => p - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span className="text-gray-300 self-center">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-40"
                        onClick={() => setCurrentPage((p) => p + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default SupplierContactCards;
