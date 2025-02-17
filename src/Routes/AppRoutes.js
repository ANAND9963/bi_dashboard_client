import React from 'react';
import SignIn from '../Auth/SignIn';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Hero from '../Hero/Hero';
import Signup from '../Auth/Signup';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/Hero" element={<Hero/>} />
      <Route path="/Home" element={<Home />} />
      <Route path="/SignIn" element={<SignIn />} />
    </Routes>
  );
};

export default AppRoutes;
