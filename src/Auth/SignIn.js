import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import "./SignIn.css";
import backgroundImage from "../assets/19187761.jpg";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = (e) => {
    // e.preventDefault();
  };
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
      <form className="login-form-container" action={submitForm}>
        <header>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Sign In
          </Typography>
        </header>
        <Typography variant="p" fontWeight={700} gutterBottom>
          Welcome please Signin to continue
        </Typography>
        <input
          name="username"
          placeholder="Enter UserName"
          value={userName}
          required
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </Box>
  );
};

export default SignIn;
