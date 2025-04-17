import React from "react";
import { Box, Typography } from "@mui/material";
const DefaultPlaceholder = ({img}) => {
  return (
    <Box
      sx={{
        height: "100vh", // Ensures the height takes the full viewport height
        backgroundImage: `url(${img})`,
        backgroundSize: "cover", // Ensures the image covers the whole area
        backgroundPosition: "center", // Centers the image
        display: "flex", // Align items centrally
        justifyContent: "center", // Centers the content horizontally
        alignItems: "center", // Centers the content vertically
        color: "white",
        textAlign: "center",
        padding: 0, // Remove any padding around the image
        margin: 0, // Remove any margin to avoid unwanted spaces
        overflow: "hidden", // Prevent scrolling
      }}
    >
      <Typography
        variant="h4"
        sx={{
          backgroundColor: "rgba(0,0,0,0.5)",
          p: 2,
          borderRadius: 2,
        }}
      >
        Welcome To the Dashboard
      </Typography>
    </Box>
  );
};

export default DefaultPlaceholder;
