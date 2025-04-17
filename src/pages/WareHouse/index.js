import React from 'react';
import { Outlet,useLocation } from 'react-router-dom';
import WareHouseSidebar from './WareHouseSidebar';
import DefaultPlaceholder from '../DefaultPlaceholder';
import bg from "../../assets/pexels-photo-236698.jpeg" // any supplier-related image

const WareHouse = () => {
  const location = useLocation();

  // If no nested route selected under /supplier
  const isDefault = location.pathname === "/WareHouse";
  return (
    <div className="flex h-screen">
      {/* Supplier Sidebar on the left */}
      <div className="w-64 fixed top-16 left-0 bottom-0"> {/* Added margin-top of 16 */}
        <WareHouseSidebar /> {/* This will show the sidebar */}
      </div>

      <div className="flex-1 ml-64 mt-16 p-4 overflow-auto"> {/* Removed top margin */}
        {isDefault ? <DefaultPlaceholder img={bg} /> : <Outlet />}
      </div>
    </div>
  );
};

export default WareHouse;
