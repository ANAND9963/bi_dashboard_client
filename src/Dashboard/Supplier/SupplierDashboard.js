import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SupplierKpiCards from './SupplierKpiCards';
import SupplierTransactionChart from './SupplierTransactionChart';
import SupplierTransactionTable from './SupplierTransactionTable';

const SupplierDashboard = () => {
    const [view, setView] = useState('chart');
    const [year, setYear] = useState('2013');
    const [data, setData] = useState([]);
    const [kpis, setKpis] = useState({
        totalTransactionAmount: 0,
        totalAmountExcludingTax: 0,
        totalTaxAmount: 0
    });

    const fetchData = async (selectedYear) => {
        const startDate = `${selectedYear}-01-01`;
        const endDate = `${selectedYear}-12-31`;
        const response = await axios.get('http://localhost:8080/api/supplier-transactions/monthly', {
            params: { startDate, endDate }
        });

        const formatted = response.data.map(d => ({
            name: `${d.transactionYear}-${String(d.transactionMonth).padStart(2, '0')}`,
            ...d
        }));

        const totalKPIs = response.data.reduce((acc, cur) => ({
            totalTransactionAmount: acc.totalTransactionAmount + cur.totalTransactionAmount,
            totalAmountExcludingTax: acc.totalAmountExcludingTax + cur.totalAmountExcludingTax,
            totalTaxAmount: acc.totalTaxAmount + cur.totalTaxAmount,
        }), { totalTransactionAmount: 0, totalAmountExcludingTax: 0, totalTaxAmount: 0 });

        setData(formatted);
        setKpis(totalKPIs);
    };

    useEffect(() => {
        fetchData(year);
    }, [year]);

    return (
        <div className="dashboard-container">
            <h2 style={{ color: 'white' }}>Supplier Transactions Dashboard</h2>

            <div className="chart-controls">
                <div>
                    <label style={{ color: 'white' }}>Year: </label>
                    <select value={year} onChange={e => setYear(e.target.value)}>
                        {[2013, 2014, 2015, 2016, 2017].map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button onClick={() => setView('chart')}>📊 Chart View</button>
                    <button onClick={() => setView('table')}>📋 Table View</button>
                </div>
            </div>

            <SupplierKpiCards kpis={kpis} />

            {view === 'chart' ? (
                <SupplierTransactionChart data={data} />
            ) : (
                <SupplierTransactionTable data={data} />
            )}
        </div>
    );
};

export default SupplierDashboard;
