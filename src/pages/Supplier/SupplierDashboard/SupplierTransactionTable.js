import React from 'react';

const SupplierTransactionTable = ({ data }) => (
    <table
        style={{
            width: '100%',
            color: 'white',
            background: '#1e1e1e',
            borderCollapse: 'collapse',
            textAlign: 'center'
        }}
    >
        <thead>
        <tr style={{ background: '#2e2e2e' }}>
            <th style={thStyle}>Year</th>
            <th style={thStyle}>Month</th>
            <th style={thStyle}>Total Transaction</th>
            <th style={thStyle}>Excl. Tax</th>
            <th style={thStyle}>Tax</th>
        </tr>
        </thead>
        <tbody>
        {data.map((row, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #444' }}>
                <td style={tdStyle}>{row.transactionYear}</td>
                <td style={tdStyle}>{row.transactionMonth}</td>
                <td style={tdStyle}>${(row.totalTransactionAmount / 1000).toFixed(1)}K</td>
                <td style={tdStyle}>${(row.totalAmountExcludingTax / 1000).toFixed(1)}K</td>
                <td style={tdStyle}>${(row.totalTaxAmount / 1000).toFixed(1)}K</td>
            </tr>
        ))}
        </tbody>
    </table>
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
