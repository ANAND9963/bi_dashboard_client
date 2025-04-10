import React from "react";
import Box from "@mui/material/Box";
import DictaphoneIcon from "./DictaphoneIcon";
import backgroundImage from "../assets/5570834.jpg";
import AppBarComponent from "./AppBarComponent";
// import SupplierContactCards from "../Dashboard/Supplier/SupplierContactCards";
// import SupplierDeliveryTable from "../Dashboard/Supplier/SupplierDeliveryTable";
// import SupplierGeoMap from "../Dashboard/Supplier/SupplierGeoMap";
import SupplierGeoTable from "../Dashboard/Supplier/SupplierGeoTable";
// import SupplierDashboard from "../Dashboard/Supplier/SupplierDashboard";
// import SupplierCategoryDonutChart from "../Dashboard/SupplierCategoryDonutChart";
// import TopSuppliersBarChart from "../Dashboard/TopSuppliersBarChart";
// import CustomerGeoMap from "../Dashboard/CustomerGeoMap"; // Import AppBarComponent
// import RevenueChart from "../Dashboard/RevenueChart";
// import OrderCountChart from "../Dashboard/OrderCountChart";

function Home() {
  const [isDictaphoneOpen, setIsDictaphoneOpen] = React.useState(false);

  // User details
  const user = {
    firstName: "Admin",
    lastName: "Admin",
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
      {/* Use the extracted AppBarComponent */}
      <AppBarComponent user={user} />
      {/*<RevenueChart/>*/}
      {/*  <OrderCountChart/>*/}
      {/*  <SupplierDashboard/>*/}
      {/*  <SupplierCategoryDonutChart/>*/}
      {/*  <TopSuppliersBarChart/>*/}
      {/*  <CustomerGeoMap/>*/}
      {/*  <SupplierContactCards/>*/}
      {/*  <SupplierDeliveryTable/>*/}
      {/*  <SupplierGeoMap/>*/}
        <SupplierGeoTable/>
      {/* Floating Dictaphone Button */}
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
