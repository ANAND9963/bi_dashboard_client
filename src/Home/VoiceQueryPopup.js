import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { CSVLink } from "react-csv";

const VoiceQueryPopup = ({ transcript, show, onClose }) => {
    const [data, setData] = useState([]);
    const [isChart, setIsChart] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (transcript && show) {
                try {
                    setError("");
                    setLoading(true);
                    setCopied(false);
                    const res = await axios.post("http://localhost:8010/ask", {
                        user_query: transcript,
                    });

                    const result = res.data;

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
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [transcript, show]);

    const handleCopy = () => {
        const text = JSON.stringify(data, null, 2);
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-4xl max-h-[90vh] overflow-auto ring-1 ring-gray-200 transition-transform">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">AI Result</h2>
                    <button
                        className="text-red-500 font-bold text-lg"
                        onClick={onClose}
                        title="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* 🔄 Loading Spinner */}
                {loading ? (
                    <div className="text-center py-10 text-gray-600">⏳ Fetching results...</div>
                ) : error ? (
                    <div className="text-red-600 font-semibold bg-red-100 border border-red-300 p-4 rounded">
                        ⚠️ {error}
                    </div>
                ) : (
                    <>
                        {/* 📋 Utility Buttons */}
                        <div className="flex justify-end space-x-3 mb-4">
                            <button
                                onClick={handleCopy}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                            >
                                {copied ? "✅ Copied!" : "📋 Copy Data"}
                            </button>
                            <CSVLink
                                data={data}
                                filename={"ai-query-result.csv"}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                            >
                                ⬇️ Export CSV
                            </CSVLink>
                        </div>

                        {isChart ? (
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
                            <table className="w-full border text-sm text-black">
                                <thead>
                                <tr>
                                    {Object.keys(data[0] || {}).map((key) => (
                                        <th
                                            key={key}
                                            className="border px-2 py-1 bg-black text-black"
                                        >
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
                    </>
                )}
            </div>
        </div>
    );
};

export default VoiceQueryPopup;
