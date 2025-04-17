import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupplierContactCards = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 6;

    useEffect(() => {
        axios.get('http://localhost:8080/api/suppliers/contacts')
            .then(res => setContacts(res.data));
    }, []);

    const supplierNames = [...new Set(contacts.map(c => c.supplierName))];

    const filtered = selectedSupplier
        ? contacts.filter(c => c.supplierName === selectedSupplier)
        : contacts;

    const totalPages = Math.ceil(filtered.length / pageSize);
    const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="p-4 ">
            {/* Dropdown */}
            <select
                className="w-full p-2 mb-4 rounded bg-[#2c2c2c] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {paginated.map((c, i) => {
                    const globalIndex = (currentPage - 1) * pageSize + i;
                    const isExpanded = expandedIndex === globalIndex;

                    return (
                        <div
                            key={globalIndex}
                            className="card-dark bg-[#1e1e1e] p-4 rounded-lg shadow-md cursor-pointer transition duration-200 hover:bg-[#2a2a2a] text-white"
                            onClick={() => toggleExpand(globalIndex)}
                        >
                            <h4 className="font-bold text-lg text-white">{c.supplierName}</h4>
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
