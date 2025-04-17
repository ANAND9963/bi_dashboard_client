import React from 'react'


import { Link } from 'react-router-dom';
export default function WareHouseSidebar() {
  return (
 <div className="h-screen w-64 bg-[#1e2939] text-white flex flex-col shadow-lg">
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/warehouse/ColdRoomTemperatureStats" className="flex items-center p-3 rounded hover:bg-[#3a3a5e] transition">
        ColdRoomTemperatureStats
        </Link>
        <Link to="/warehouse/LowStockAlerts" className="flex items-center p-3 rounded hover:bg-[#3a3a5e] transition">
        LowStockAlerts
        </Link>
        <Link to="/warehouse/PackageTypeCountTable" className="flex items-center p-3 rounded hover:bg-[#3a3a5e] transition">
        PackageTypeCountTable
        </Link>
        <Link to="/warehouse/StockGroupUsageChart" className="flex items-center p-3 rounded hover:bg-[#3a3a5e] transition">
        StockGroupUsageChart
        </Link>
        <Link to="/warehouse/TopSellingItems" className="flex items-center p-3 rounded hover:bg-[#3a3a5e] transition">
        TopSellingItems
        </Link>
        <Link to="/warehouse/VehicleTempViolations" className="flex items-center p-3 rounded hover:bg-[#3a3a5e] transition">
        VehicleTempViolations
        </Link>
      </nav>
      </div>
  )
}
