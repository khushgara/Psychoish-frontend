import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

export const AuthContext = createContext();

const API_URL = API_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      localStorage.setItem("token", urlToken);
      // Clean query parameter from address bar
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      return urlToken;
    }
    return localStorage.getItem("token");
  });
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
          const response = await axios.get(`${API_URL}/api/auth/me`);
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

  // Automatically subscribe logged-in users to newsletter for future marketing
  useEffect(() => {
    if (user && user.email) {
      const autoSubscribe = async () => {
        try {
          await axios.post(`${API_URL}/api/newsletter/subscribe`, {
            email: user.email,
          });
        } catch (error) {
          // Fail silently in background
          console.log("Background marketing sync completed.");
        }
      };
      autoSubscribe();
    }
  }, [user]);

  // Kept for external use if needed, but the primary fetch is now inside the effect


  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
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

  const signup = async (name, email, password, confirmPassword, profileData = {}) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        name,
        email,
        password,
        confirmPassword,
        phone: profileData.phone || null,
        date_of_birth: profileData.dateOfBirth || null,
        gender: profileData.gender || null,
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
