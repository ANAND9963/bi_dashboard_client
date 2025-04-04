import React from "react";
import Box from "@mui/material/Box";
import DictaphoneIcon from "./DictaphoneIcon";
import backgroundImage from "../assets/5570834.jpg";
import AppBarComponent from "./AppBarComponent"; // Import AppBarComponent
import RevenueChart from "../Dashboard/RevenueChart";

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
      <RevenueChart/>

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
