import { Box, Typography } from "@mui/material";
import backgroundImage from "../assets/IMG-20250216-WA0012.jpg";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { toast } from "react-toastify";
import { SignInApi } from "./AuthCalls";

const SignIn = () => {
  const [userName, setUserName] = useState("");
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
  const submitForm = (e) => {
    // submit login details to backend
    e.preventDefault();
    if (userName === "" || password === "") {
      notify("Please enter both username and password", "error");
      return;
    } else {
      //send user details to server
      const payload = {
        "userName": userName,
        "password": password
      }
      const response = SignInApi(payload);
      if (response.status === 200) {
        notify("you are Signedup successfully!", "success");
        if (userName === "admin" && password === "admin") {
          setTimeout(() => {
            navigate("/Home");
          }, 2000);
        } else {
          setTimeout(() => {
            navigate("/Home");
          }, 2000);
        }
      } else {
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
        <input name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Input UserName" required ></input>
        <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Input Password" required></input>
        <button type="submit" >Login</button>
        <Typography mt={2}>
          Already have an account?{" "}
          <Link to="/sign-up" style={{ color: "#ffcc00", textDecoration: "none", fontWeight: "bold" }}>
            Sign-Up
          </Link>
        </Typography>
      </form>
      {/* </div> */}
    </Box>
  );
}
export default SignIn;
