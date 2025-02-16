import React from 'react';
import SignIn from '../Auth/SignIn';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SignIn" element={<SignIn />} />
    </Routes>
  );
};

export default AppRoutes;
