import React, { createContext, useState, useEffect } from "react";
import { themes } from "../theme"; // Correct import

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem("themeMode");
    if (saved) return saved;
    // Fallback to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Synchronize theme attribute to root document elements
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    document.body.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  // Listen to system theme changes dynamically (only if no manual selection is saved)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const saved = localStorage.getItem("themeMode");
      if (!saved) {
        setThemeMode(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
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
