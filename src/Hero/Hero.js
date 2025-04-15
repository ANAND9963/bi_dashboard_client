import { Box, Typography } from "@mui/material";
import React from "react";
import backgroundImage from "../assets/17380.jpg";
import StyledButton from "../StyledComponents/StyledComponents";
import {  useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        px: 3,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better readability
        backdropFilter: "blur(3px)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          gap: 1,
        }}
      >
        <StyledButton variant="outlined" onClick={()=>navigate("/sign-in")}>Login</StyledButton>

        <StyledButton variant="outlined" onClick={()=>navigate("/sign-up")}>Sign Up</StyledButton>
      </Box>

      <Typography variant="h3" fontWeight={700} gutterBottom>
        AI-Powered Business Intelligence Dashboard
      </Typography>
      <Typography variant="h6" sx={{ maxWidth: "600px", opacity: 0.9 }}>
        Transform Data into Insights, Hands-Free with Voice-Driven Analytics.
      </Typography>
    </Box>
  );
};

export default Hero;
