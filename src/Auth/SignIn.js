import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import "./SignIn.css";
import backgroundImage from "../assets/19187761.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignInApi } from "./AuthCalls";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const notify = () =>
    toast.success("you are Signedup successfully!", {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
      className: "custom-toast-sucess",
      closeButton: false,
      hideProgressBar: true
    });
  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    if (userName === "" || password === "") {
      setError("Please enter both username and password");
      return;
    } else {
      //send user details to server
      const payload = {
        "userName": userName,
        "password": password
      }
      const response = SignInApi(payload);
      if (response.status === 200) {
        notify();
        if (userName === "admin" && password === "admin") {
            setTimeout(() => {
            navigate("/Home");
          }, 2000);
        }else{
          setTimeout(() => {
            navigate("/Home");
          }, 2000);
        }
      } else {
        setError(response.message);
        notify();
      }
    }

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
        backdropFilter: "blur(3px)",
      }}
    >
      <form className="login-form-container" onSubmit={submitForm}>
        <header>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Sign In
          </Typography>
        </header>
        <Typography variant="p" fontWeight={700} gutterBottom>
          Welcome please Sign in to continue
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
        <Typography mt={2}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#ffcc00", textDecoration: "none", fontWeight: "bold" }}>
            Sign up
          </Link>
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
      </form>
      <ToastContainer />
    </Box>
  );
};

export default SignIn;
