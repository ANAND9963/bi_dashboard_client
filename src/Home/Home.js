import React from "react";
import Box from "@mui/material/Box";
import DictaphoneIcon from "./DictaphoneIcon";
import backgroundImage from "../assets/5570834.jpg";
import NavBar from "./NavBar";
import LowStockAlerts from "../Dashboard/WareHouse/LowStockAlerts";
import VehicleTempViolations from "../Dashboard/WareHouse/VehicleTempViolations";
import StockGroupUsageChart from "../Dashboard/WareHouse/StockGroupUsageChart";
import PackageTypeCountTable from "../Dashboard/WareHouse/PackageTypeCountTable";
import  Dashboard  from "../Dashboard/index.js";
// import TopSellingItems from "../Dashboard/WareHouse/TopSellingItems";
// import ColdRoomTemperatureStats from "../Dashboard/WareHouse/ColdRoomTemperatureStats";
// import SupplierContactCards from "../Dashboard/Supplier/SupplierContactCards";
// import SupplierDeliveryTable from "../Dashboard/Supplier/SupplierDeliveryTable";
// import SupplierGeoMap from "../Dashboard/Supplier/SupplierGeoMap";
// import SupplierGeoTable from "../Dashboard/Supplier/SupplierGeoTable";
// import SupplierDashboard from "../Dashboard/Supplier/SupplierDashboard";
// import SupplierCategoryDonutChart from "../Dashboard/SupplierCategoryDonutChart";
// import TopSuppliersBarChart from "../Dashboard/TopSuppliersBarChart";
// import CustomerGeoMap from "../Dashboard/CustomerGeoMap"; // Import NavBar
// import RevenueChart from "../Dashboard/RevenueChart";
// import OrderCountChart from "../Dashboard/OrderCountChart";

function Home() {
  const [isDictaphoneOpen, setIsDictaphoneOpen] = React.useState(false);

  // User details
  const user = {
    firstName: "Admin",
    lastName: "",
  };

  const handleDictaphoneIconClick = () => {
    setIsDictaphoneOpen(!isDictaphoneOpen);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Use the extracted NavBar */}
      <NavBar user={user} />
      <Dashboard/>
      {/* <PackageTypeCountTable/> */}
      {/*<RevenueChart/>*/}
      {/*  <OrderCountChart/>*/}
      {/*  <SupplierDashboard/>*/}
      {/*  <SupplierCategoryDonutChart/>*/}
      {/*  <TopSuppliersBarChart/>*/}
      {/*  <CustomerGeoMap/>*/}
      {/*  <SupplierContactCards/>*/}
      {/*  <SupplierDeliveryTable/>*/}
      {/*  <TopSellingItems />*/}
      {/*  <SupplierGeoMap/>*/}
      {/*  <ColdRoomTemperatureStats/>*/}
      {/*  <SupplierGeoTable/>*/}
      {/* Floating Dictaphone Button */}
      {/*  <LowStockAlerts/>*/}
      {/*  <VehicleTempViolations/>*/}
      {/*  <StockGroupUsageChart/>*/}
       
      <Box
        onClick={handleDictaphoneIconClick}
        sx={{
          position: "fixed",
          bottom: isDictaphoneOpen ? "50%" : "8rem",
          right: isDictaphoneOpen ? "50%" : "8rem",
          transform: isDictaphoneOpen ? "translate(50%, 50%)" : "none",
          transition: "all 0.3s ease",
          zIndex: 10,
        }}
      >
        <DictaphoneIcon />
      </Box>
    </Box>
  );
}

export default Home;
