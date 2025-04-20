import React from 'react';

const SupplierKpiCards = ({ kpis }) => {
    return (
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
             <div><h3 className="font-semibold text-black" >Total Transactions</h3><p className='text-md text-blue-400'>${kpis?.totalTransactionAmount.toFixed(2)}</p></div>
             <div><h3 className="font-semibold text-black" >Excl. Tax</h3><p className='text-md text-blue-400'>${kpis?.totalAmountExcludingTax.toFixed(2)}</p></div>
             <div><h3 className="font-semibold text-black" >Tax Amount</h3><p className='text-md text-blue-400'>${kpis?.totalTaxAmount.toFixed(2)}</p></div>
        </div>
    );
};

export default SupplierKpiCards;
