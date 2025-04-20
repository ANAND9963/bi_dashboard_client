import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SupplierSidebar() {
  const location = useLocation();

  const links = [
    { path: "/supplier/ContactCards", label: "ContactCards" },
    { path: "/supplier/Dashboard", label: "Dashboard" },
    { path: "/supplier/DeliveryTable", label: "DeliveryTable" },
    { path: "/supplier/geo-map", label: "GeoMap" },
    { path: "/supplier/geo-table", label: "GeoTable" },
    // { path: "/supplier/kpi-cards", label: "KpiCards" },
  ];

  return (
    <div className="h-screen w-64 bg-[#1e2939] text-white flex flex-col shadow-lg">
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center p-3 rounded transition ${
                isActive ? 'bg-[#3a3a5e]' : 'hover:bg-[#3a3a5e]'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
