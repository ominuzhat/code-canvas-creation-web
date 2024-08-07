"use client";
import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    details: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      details: "",
    });
  };

  const userInfo = {
    user,
    setUser,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
