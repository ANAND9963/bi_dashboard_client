import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar"; // Your NavBar component

const Layout = ({ user }) => {
  return (
    <>
      <NavBar user={user} />
      <div className="flex">
        {/* Main Content */}
        <div className="bg-gray-200 flex-1 pt-0"> {/* Removed any top padding */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
