import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';

const PORT = process.env.REACT_APP_API_URL;

const CustomerGeoEChart = () => {
    const [locations, setLocations] = useState([]);
    const [showHeatmap, setShowHeatmap] = useState(true);

    useEffect(() => {
        axios.get(`${PORT}api/customers/locations`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            }
        }).then(res => setLocations(res.data))
          .catch(err => {
              if (err.response) {
                  console.error("Error Response:", err.response.status, err.response.data);
              } else {
                  console.error("Network Error:", err.message);
              }
          });
    }, []);

    const heatData = locations.map(loc => ({
        name: loc.customerName,
        value: [loc.longitude, loc.latitude, 1],
        city: loc.cityName,
    }));

    const scatterData = locations.map(loc => ({
        name: loc.customerName,
        value: [loc.longitude, loc.latitude],
        city: loc.cityName,
    }));

    const getOption = () => ({
        backgroundColor: '#1e1e2f',
        tooltip: {
            trigger: 'item',
            formatter: ({ data }) => `
                <strong>${data.name}</strong><br/>
                ${data.city}<br/>
                Lat: ${data.value[1]}, Long: ${data.value[0]}
            `,
        },
        geo: {
            map: 'world',
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#3a3a5e',
                    borderColor: '#111',
                },
                emphasis: {
                    areaColor: '#2a2a40',
                }
            }
        },
        series: showHeatmap ? [{
            type: 'heatmap',
            coordinateSystem: 'geo',
            data: heatData,
            pointSize: 10,
            blurSize: 15
        }] : [{
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 8,
            itemStyle: {
                color: '#00e0ff'
            },
            data: scatterData
        }]
    });

    return (
        <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
            <h3 style={{ textAlign: 'center', color: 'white', marginBottom: '10px' }}>Customer Geo Map</h3>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <label style={{ color: 'white' }}>
                    <input
                        type="checkbox"
                        checked={showHeatmap}
                        onChange={() => setShowHeatmap(!showHeatmap)}
                        style={{ marginRight: '6px' }}
                    />
                    Show Heatmap
                </label>
            </div>
            <ReactECharts
                option={getOption()}
                style={{ height: '500px', width: '100%' }}
                opts={{ renderer: 'canvas' }}
                theme="dark"
            />
        </div>
    );
};

export default CustomerGeoEChart;
