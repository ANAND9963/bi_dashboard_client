import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const VoiceQueryPopup = ({ transcript, show, onClose }) => {
    const [data, setData] = useState([]);
    const [isChart, setIsChart] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (transcript && show) {
                try {
                    setError("");
                    const res = await axios.post("http://localhost:8000/ask", {
                        user_query: transcript,
                    });

                    const result = res.data;

                    // Handle if result is an error object
                    if (Array.isArray(result) && result.length > 0) {
                        const first = result[0];
                        const keys = Object.keys(first);
                        if (
                            keys.length === 2 &&
                            typeof first[keys[0]] === "string" &&
                            typeof first[keys[1]] === "number"
                        ) {
                            setIsChart(true);
                        } else {
                            setIsChart(false);
                        }
                        setData(result);
                    } else {
                        setError("Unexpected response format");
                    }
                } catch (err) {
                    const message =
                        err.response?.data?.error || "Something went wrong while fetching data.";
                    setError(message);
                    setData([]);
                }
            }
        };

        fetchData();
    }, [transcript, show]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-4xl max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">AI Result</h2>
                    <button className="text-red-500 font-bold text-lg" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {error ? (
                    <div className="text-red-600 font-semibold bg-red-100 border border-red-300 p-4 rounded">
                        ⚠️ {error}
                    </div>
                ) : isChart ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data}>
                            <XAxis dataKey={Object.keys(data[0])[0]} />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#ccc" />
                            <Bar dataKey={Object.keys(data[0])[1]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <table className="w-full border text-sm">
                        <thead>
                        <tr>
                            {Object.keys(data[0] || {}).map((key) => (
                                <th key={key} className="border px-2 py-1 bg-gray-100">
                                    {key}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                {Object.keys(row).map((key) => (
                                    <td key={key} className="border px-2 py-1">
                                        {row[key]}
                                    </td>
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
