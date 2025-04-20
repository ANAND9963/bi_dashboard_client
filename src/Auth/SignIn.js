import { Box, Typography } from "@mui/material";
import backgroundImage from "../assets/IMG-20250216-WA0012.jpg";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignInApi } from "./AuthCalls";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const notify = (message, type) => {
        if (type === "success") {
          toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            className: "custom-toast-sucess",
            closeButton: false,
            hideProgressBar: true
          });
        } else if ("error") {
          toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            className: "custom-toast-sucess",
            closeButton: false,
            hideProgressBar: true
          });
        } else {
          toast.info(message, {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            className: "custom-toast-sucess",
            closeButton: false,
            hideProgressBar: true
          });
        }
      }
  const submitForm = async(e) => {
    // submit login details to backend
    e.preventDefault();
    if (email === "" || password === "") {
      notify("Please enter both email and password", "error");
      return;
    } else {
      //send user details to server
      const payload = {
        "email": email,
        "password": password
      }
      const response = await SignInApi(payload);
      if (response?.status === 200) {
        notify(response?.data?.message,"success");
          setTimeout(() => {
            navigate("/Home");
         email === "admin" && password === "admin" ? navigate("/Home"): navigate("/Home")
          }, 2000);
        } 
         else {
        notify(response.message, "error");
      }
    }
  }
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
        //   color: "white",
        textAlign: "center",
        px: 3,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better readability
        backdropFilter: "blur(3px)",
      }}
    >
      {/* <div className="divContainer"> */}
      <form className="formContainer" onSubmit={submitForm} name="sign-in">
        <header><h1>Sign in</h1></header>
        <p>Welcome, please sign in to continue</p>
        <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Input email" required ></input>
        <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Input Password" required></input>
        <button type="submit" >Login</button>
        <Typography mt={2}>
          don't have an account?{" "}
          <Link to="/sign-up" style={{ color: "#ffcc00", textDecoration: "none", fontWeight: "bold" }}>
            Sign-Up
          </Link>
        </Typography>
      </form>
      {/* </div> */}
       <ToastContainer />
    </Box>
  );
}
export default SignIn;
