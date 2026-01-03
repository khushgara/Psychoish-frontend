import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_URL = "psychoish-backend-production-5efd.up.railway.app";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Create axios instance with base URL - memoized to prevent recreation on every render
  const [axiosInstance] = useState(() => axios.create({
    baseURL: API_URL,
  }));

  const logout = React.useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    delete axiosInstance.defaults.headers.common["Authorization"];
  }, [axiosInstance]);

  // Configure axios defaults and fetch user
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      const fetchCurrentUser = async () => {
        try {
          const response = await axios.get(`${API_URL}/auth/me`);
          if (response.data.success) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
          logout();
        } finally {
          setLoading(false);
        }
      };

      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, [token, axiosInstance, logout]); // Added axiosInstance dependency, but it's stable now

  // Kept for external use if needed, but the primary fetch is now inside the effect


  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data;
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
        confirmPassword,
      });

      if (response.data.success) {
        const { token, user } = response.data;
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Signup failed",
      };
    }
  };



  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token,
    axiosInstance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
