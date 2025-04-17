import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const VoiceQueryPopup = ({ transcript, show, onClose }) => {
    const [data, setData] = useState([]);
    const [isChart, setIsChart] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (transcript) {
                try {
                    const res = await axios.post("http://localhost:8000/ask", {
                        user_query: transcript,
                    });

                    const result = res.data;

                    // Detect if it can be a chart: 2 columns, first string, second numeric
                    if (
                        result.length > 0 &&
                        Object.keys(result[0]).length === 2 &&
                        typeof Object.values(result[0])[0] === "string" &&
                        typeof Object.values(result[0])[1] === "number"
                    ) {
                        setIsChart(true);
                    } else {
                        setIsChart(false);
                    }

                    setData(result);
                } catch (err) {
                    console.error("❌ Error fetching data", err);
                }
            }
        };

        if (show) fetchData();
    }, [transcript, show]);

    if (!show) return null;

    const keys = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-4xl max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">AI Result</h2>
                    <button className="text-red-500 font-bold text-lg" onClick={onClose}>✕</button>
                </div>

                {isChart ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data}>
                            <XAxis dataKey={keys[0]} />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <Bar dataKey={keys[1]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <table className="w-full border mt-4 text-sm">
                        <thead>
                        <tr>
                            {keys.map((key) => (
                                <th key={key} className="border px-2 py-1 bg-gray-100">{key}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                {keys.map((key) => (
                                    <td key={key} className="border px-2 py-1">{row[key]}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default VoiceQueryPopup;
