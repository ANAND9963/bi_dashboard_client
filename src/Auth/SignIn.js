import React, { useState } from "react";
import "./SignIn.css";
import videoBg from "../assets/background-video.mp4";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = (e) => {
    // e.preventDefault();
  };
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <form className="login-form-container" action={submitForm}>
        <header>
          <h1>Login</h1>
        </header>
        <p>Welcome please login to continue</p>
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
    </div>
  );
};

export default SignIn;
