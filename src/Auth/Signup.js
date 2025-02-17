import React, { useState } from "react";
import "./SignIn.css";
import { Box, Typography } from "@mui/material";
import backgroundImage from "../assets/19187761.jpg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const notify = () => 
    toast.success("you are Signedup successfully!",{
      position:"top-center",
      autoClose:3000,
      theme:"light",
      className:"custom-toast-sucess",
      closeButton:false,
      hideProgressBar:true
    });
 
  // const [userName, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    notify();
    setTimeout(() => {
      navigate("/SignIn"); // Navigate to the SignIn page
    }, 2000);
    
    
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
      <form className="login-form-container" onSubmit={submitForm}>
        <header>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Signup
          </Typography>
        </header>
        <Typography variant="p" fontWeight={700} gutterBottom>
          Welcome please Signup to continue
        </Typography>
        <input
          name="FirstName"
          placeholder="Enter FirstName"
          value={firstname}
          required
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <input
          name="lastname"
          placeholder="Enter LastName"
          value={lastname}
          required
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <input
          name="email"
          placeholder="Enter Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          name="password"
          placeholder="Enter Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Re Enter Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Register</button>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default Signup;
