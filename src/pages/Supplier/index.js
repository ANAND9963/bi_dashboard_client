import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SupplierSidebar from './SupplierSidebar'; // Import the sidebar
import DefaultPlaceholder from '../DefaultPlaceholder';
import bg from "../../assets/istockphoto-2206316446-612x612.jpg"; // any supplier-related image
const Supplier = () => {
  const location = useLocation();

  // If no nested route selected under /supplier
  const isDefault = location.pathname === "/supplier";

  return (
    <div className="flex h-screen">
      {/* Supplier Sidebar on the left */}
      <div className="w-64 h-full  bg-white border-r">
        <SupplierSidebar />
      </div>

      {/* Right content */}
      <div className="flex-1 h-full  bg-gray-100">
        {isDefault ? <DefaultPlaceholder img={bg} text={"Supplier Dashboard"} /> : <Outlet />}
      </div>
    </div>
  );
};

export default Supplier;
