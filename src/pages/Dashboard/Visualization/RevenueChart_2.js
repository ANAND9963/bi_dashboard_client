import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import axiosInstance from "../../../api/axiosInstance";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

const formatLabel = (value) =>
  value >= 1000 ? (value / 1000).toFixed(0) + "K" : value;

const RevenueChart_2 = () => {
  const [data, setData] = useState([]);
  const [startYear, setStartYear] = useState(2013);
  const [endYear, setEndYear] = useState(2017);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/stats/quarterly?startYear=${startYear}&endYear=${endYear}`,{headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        }}
        );
        const formatted = res.data.map((item) => ({
          name: `${item.year} Q${item.quarter}`,
          year: item.year,
          quarter: item.quarter,
          revenue: item.revenue / 1000,
          orders: item.orders,
          aov: item.avgOrderValue,
        }));
        setData(formatted);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [startYear, endYear]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("📊 Quarterly Business KPIs", 14, 16);

    const tableData = data.map((d) => [
      d.name,
      `${d.revenue.toFixed(2)}K`,
      d.orders,
      d.aov.toFixed(2),
    ]);

    doc.autoTable({
      head: [["Quarter", "Revenue (K)", "Orders", "Avg Order Value"]],
      body: tableData,
      startY: 20,
    });

    doc.save("Quarterly_Business_KPIs.pdf");
  };

  const csvHeaders = [
    { label: "Year", key: "year" },
    { label: "Quarter", key: "quarter" },
    { label: "Revenue (K)", key: "revenue" },
    { label: "Orders", key: "orders" },
    { label: "Avg Order Value", key: "aov" },
  ];

  return (
    <div className="p-6 font-sans bg-gray-900 text-white">
    <h2 className="text-center text-xl font-semibold  mb-4">
        Quarterly Business KPIs
      </h2>

      {/* Filters
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div>
          <label className="mr-2">Start Year:</label>
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(+e.target.value)}
            className="text-black px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="mr-2">End Year:</label>
          <input
            type="number"
            value={endYear}
            onChange={(e) => setEndYear(+e.target.value)}
            className="text-black px-3 py-2 rounded"
          />
        </div>
        <CSVLink
          headers={csvHeaders}
          data={data}
          filename="Quarterly_Business_KPIs.csv"
          className="bg-black px-4 py-2 rounded text-white hover:bg-gray-800"
        >
          Export CSV
        </CSVLink>
        <button
          onClick={exportPDF}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          Export PDF
        </button>
      </div> */}

   
           <ResponsiveContainer  width="100%" height={400}>
                       <BarChart data={data}>
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis dataKey="name" tick={{ fill: "#fff" }} />
                         <YAxis
                           tick={{ fill: "#fff" }}
                           label={{
                             value: "Revenue (K) & Orders",
                             angle: -90,
                             position: "insideLeft",
                             fill: "#fff",
                           }}
                           tickFormatter={formatLabel}
                         />
                <Tooltip formatter={(value) => value.toFixed(2)} />
                <Legend />
                <Bar dataKey="aov" fill="#ffc658" name="Avg Order Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        
      
    
  );
};

export default RevenueChart_2;
