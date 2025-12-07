import React, { createContext, useState, useEffect } from "react";
import { themes } from "../theme"; // ✅ Correct import

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("themeMode");
    if (saved) setThemeMode(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("themeMode", newTheme);
  };

  const value = { themeMode, theme: themes[themeMode], toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
