import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import backgroundImage from "../assets/17380.jpg";
import StyledButton from "../StyledComponents/StyledComponents";
import particlesConfig from "../config/particle-config";

const Hero = () => {
  const navigate = useNavigate();


  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
    

      {/* Background Image & Main Content */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(3px)",
          zIndex: 1, // puts it above particles
        }}
      >
        {/* Login/SignUp Buttons */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            display: "flex",
            gap: 1,
          }}
        >
          <StyledButton variant="outlined" onClick={() => navigate("/sign-in")}>
            Login
          </StyledButton>
          <StyledButton variant="outlined" onClick={() => navigate("/sign-up")}>
            Sign Up
          </StyledButton>
        </Box>

        {/* Title and Subtitle */}
        <Typography variant="h3" fontWeight={700} gutterBottom>
          AI-Powered Business Intelligence Dashboard
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: "600px", opacity: 0.9 }}>
          Transform Data into Insights, Hands-Free with Voice-Driven Analytics.
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
