import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [folderName, setFolder] = useState("");
  const [fileName, setFileName] = useState("");
  const  [selectedFolderId, setSelectedFolderId] = useState(null);

  const [theme, setTheme] = useState(() => {
    // Check if there's a theme saved in localStorage
    return localStorage.getItem("theme") || "light"; // Default to "light" theme
  });

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save to localStorage
  };

  useEffect(() => {
    // Apply the theme to the body
    document.body.className = theme;
  }, [theme]);


  return (
    <AppContext.Provider value={{ folderName, setFolder, fileName, setFileName, selectedFolderId, setSelectedFolderId, theme, toggleTheme,setTheme }}>
      {children}
    </AppContext.Provider>
  );
};
