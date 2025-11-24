// /*****************************************************************************// */
import React, { createContext, useState, useEffect } from "react";
export const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Step 1: default theme

  // 🟢 Step 2: When app first loads — read from localStorage
  
  // This useffect helps to remember the last stage of the theme even if we refresh or reopen our page. We see the same mode in which we leave last.
  useEffect(() => {
    console.log("🔍 Checking localStorage for saved theme...");
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      console.log("✅ Found saved theme:", savedTheme);
      setTheme(savedTheme); // update state if found
    } else {
      console.log(
        "❌ No theme found in localStorage. Using 'light' as default."
      );
    }
  }, []);
  // 🟢 Step 3: Whenever theme changes — apply & save
  // in this we call setheme again and again that's why we got stuck in infinite loop thats why we have to create another useffect and settheme(theme) in it so that each time theme changes it renders only once. not again and again.
  useEffect(() => {
    console.log("🎨 Applying theme:", theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }   
  
    console.log("💾 Saving theme to localStorage:", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  // 🟢 Step 4: Toggle button logic
  const toggleTheme = () => {
    console.log("🔁 Toggling theme...");
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
