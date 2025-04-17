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
      <div className="w-64 fixed top-16 left-0 bottom-0"> {/* Fixed positioning without margin */}
        <SupplierSidebar /> {/* This will show the sidebar */}
      </div>

      <div className="flex-1 ml-64 top-0 mt-16 p-4 overflow-auto"> {/* Removed top margin */}
        {isDefault ? <DefaultPlaceholder img={bg} /> : <Outlet />}
      </div>
    </div>
  );
};

export default Supplier;
