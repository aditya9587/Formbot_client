import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [folderName, setFolder] = useState("");
  const [fileName, setFileName] = useState("");
  const  [selectedFolderId, setSelectedFolderId] = useState(null);

  return (
    <AppContext.Provider value={{ folderName, setFolder, fileName, setFileName, selectedFolderId, setSelectedFolderId }}>
      {children}
    </AppContext.Provider>
  );
};
