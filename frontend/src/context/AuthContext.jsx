import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/me", {
        withCredentials: true,
      });
      setuser(response.data.user);
    } catch (err) {
      setuser(null);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setuser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
