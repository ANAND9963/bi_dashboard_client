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
      <div className="w-64  h-full bg-white border-r"> {/* Added margin-top of 16 */}
        <WareHouseSidebar /> {/* This will show the sidebar */}
      </div>

      <div className="flex-1 h-full  bg-gray-100"> {/* Removed top margin */}
        {isDefault ? <DefaultPlaceholder img={bg} text={"WareHouse"}/> : <Outlet />}
      </div>
    </div>
  );
};

export default WareHouse;
