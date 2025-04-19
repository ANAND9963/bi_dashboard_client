import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SupplierKpiCards from '../SupplierKpiCards';
import SupplierTransactionChart from './SupplierTransactionChart';
import SupplierTransactionTable from './SupplierTransactionTable';
const PORT=process.env.REACT_APP_API_URL;
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
        const response = await  axios.get(`${PORT}api/supplier-transactions/monthly`, {
            params: { startDate, endDate },
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                    // "Authorization": "Bearer YOUR_TOKEN_HERE" // Uncomment if using auth
                }
        }).catch(err => {
            if (err.response) {
                console.error(" Error Response:", err.response.status, err.response.data);
            } else {
                console.error(" Network Error:", err.message);
            }
        }, [])

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
            <h2 style={{ color: 'black' }}>Supplier Transactions Dashboard</h2>

            <div className="chart-controls">
                <div>
                    <label style={{ color: 'black' }}>Year: </label>
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
