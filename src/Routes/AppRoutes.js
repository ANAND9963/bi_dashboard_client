import React from 'react';
import SignIn from '../Auth/SignIn';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Hero from '../Hero/Hero';
import SignUp from '../Auth/Signup';
import Profile from '../Home/Profile';

const AppRoutes = () => {
  return (
    <Routes>
       <Route  path="/" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/Hero" element={<Hero/>} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
