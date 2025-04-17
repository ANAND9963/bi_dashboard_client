import React from 'react';
import SignIn from '../Auth/SignIn';
import { Route, Routes } from 'react-router-dom';
import Hero from '../Hero/Hero';
import SignUp from '../Auth/Signup';
import Supplier from "../pages/Supplier";
import WareHouse from "../pages/WareHouse/index";
import Home from "../Home/index"
import Dashboard from "../pages/Dashboard/index";
import Layout from '../components/Layout';
// Pages
import SupplierContactCards from "../pages/Supplier/SupplierContactCards";
import SupplierDashboard from "../pages/Supplier/SupplierDashboard";
import SupplierDeliveryTable from "../pages/Supplier/SupplierDeliveryTable";
import SupplierGeoMap from "../pages/Supplier/SupplierGeoMap";
import SupplierGeoTable from "../pages/Supplier/SupplierGeoTable";
import SupplierKpiCards from "../pages/Supplier/SupplierKpiCards";

import ColdRoomTemperatureStats from "../pages/WareHouse/ColdRoomTemperatureStats";
import LowStockAlerts from "../pages/WareHouse/LowStockAlerts";
import PackageTypeCountTable from "../pages/WareHouse/PackageTypeCountTable";
import StockGroupUsageChart from "../pages/WareHouse/StockGroupUsageChart";
import TopSellingItems from "../pages/WareHouse/TopSellingItems";
import VehicleTempViolations from "../pages/WareHouse/VehicleTempViolations";
const user = {
  firstName: "Admin",
  lastName: "",
};
const AppRoutes = () => {
  return (

<Routes>
  {/* Pages with NavBar */}
  <Route path="/" element={<Layout user={user} />}>
  <Route index element={<Hero />} />
    <Route path="/Home" element={<Home />} />
    <Route path="supplier" element={<Supplier />}>
          <Route path="ContactCards" element={<SupplierContactCards />} />
          <Route path="Dashboard" element={<SupplierDashboard />} />
          <Route path="DeliveryTable" element={<SupplierDeliveryTable />} />
          <Route path="geo-map" element={<SupplierGeoMap />} />
          <Route path="geo-table" element={<SupplierGeoTable />} />
          <Route path="kpi-cards" element={<SupplierKpiCards />} />
        </Route>
        <Route path="warehouse" element={<WareHouse />}>
          <Route path="ColdRoomTemperatureStats" element={<ColdRoomTemperatureStats />} />
          <Route path="LowStockAlerts" element={<LowStockAlerts />} />
          <Route path="PackageTypeCountTable" element={<PackageTypeCountTable />} />
          <Route path="StockGroupUsageChart" element={<StockGroupUsageChart />} />
          <Route path="TopSellingItems" element={<TopSellingItems />} />
          <Route path="VehicleTempViolations" element={<VehicleTempViolations />} />
          
        </Route>
   
  </Route>

  {/* Optional: Auth pages or pages without NavBar */}
 
  <Route path="/sign-in" element={<SignIn />} />
  <Route path="/sign-up" element={<SignUp/>} />
</Routes>

  );
};

export default AppRoutes;
