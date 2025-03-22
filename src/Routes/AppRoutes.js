import React from 'react';
import SignIn from '../Auth/SignIn';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Hero from '../Hero/Hero';
import Signup from '../Auth/Signup';
import Profile from '../Home/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/Hero" element={<Hero/>} />
      <Route path="/Home" element={<Home />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
