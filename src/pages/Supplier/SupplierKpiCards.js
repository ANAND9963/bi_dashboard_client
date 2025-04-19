import React from 'react';

const SupplierKpiCards = ({ kpis }) => {
    return (
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
             <div><h4>Total Transactions</h4><p>${kpis.totalTransactionAmount.toFixed(2)}</p></div>
             <div><h4>Excl. Tax</h4><p>${kpis.totalAmountExcludingTax.toFixed(2)}</p></div>
             <div><h4>Tax Amount</h4><p>${kpis.totalTaxAmount.toFixed(2)}</p></div>
        </div>
    );
};

export default SupplierKpiCards;
