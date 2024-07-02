import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const Secure = () => {
  const lock = Cookies.get("userToken");

  if (!lock) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default Secure;
