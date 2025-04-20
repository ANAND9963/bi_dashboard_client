import React from 'react';

const SupplierTransactionTable = ({ data }) => (
    <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-700 table-auto rounded-lg overflow-hidden">
                    <thead className="bg-[#0f172a] text-white">
                        <tr>
                         <th className="p-4 border border-gray-700">Year</th>
        <th className="p-4 border border-gray-700">Month</th>
            <th className="p-4 border border-gray-700">Total Transaction</th>
            <th className="p-4 border border-gray-700">Excl. Tax</th>
            <th className="p-4 border border-gray-700">Tax</th>
        </tr>
        </thead>
        <tbody>
        {data.map((row, idx) => (
            <tr key={idx}   className={`${idx % 2 === 0 ? 'bg-[#1e293b]' : 'bg-[#2e3b51]'} hover:bg-[#3b4a64] transition-colors`}
            >
               <td className="p-4 border border-gray-700">{row.transactionYear}</td>
               <td className="p-4 border border-gray-700">{row.transactionMonth}</td>
               <td className="p-4 border border-gray-700">${(row.totalTransactionAmount / 1000).toFixed(1)}K</td>
               <td className="p-4 border border-gray-700">${(row.totalAmountExcludingTax / 1000).toFixed(1)}K</td>
               <td className="p-4 border border-gray-700">${(row.totalTaxAmount / 1000).toFixed(1)}K</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);

const thStyle = {
    padding: '12px',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: '1px solid #444'
};

const tdStyle = {
    padding: '10px',
    verticalAlign: 'middle',
    textAlign: 'center'
};

export default SupplierTransactionTable;
