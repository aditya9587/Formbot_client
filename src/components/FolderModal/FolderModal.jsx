import React, { useContext } from "react";
import style from "./FolderModal.module.css";

import { AppContext } from "../../context/index.jsx";
// import { createFolder } from "../../services/folderApi";

export default function FolderModal({ closeModal, createFolder }) {
  const { folderName, setFolder } = useContext(AppContext);

  // const handleCreateFolder = async () => {
  //   try {
  //     const response = await createFolder({ folderName });
  //     closeModal();
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className={style.folderModal}>
      <h3>Create New Folder</h3>
      <input
        type="text"
        placeholder="Enter Folder Name"
        name="folderName"
        value={folderName}
        onChange={(e) => setFolder(e.target.value)}
      />
      <div className={style.button}>
        <button className={style.create} onClick={createFolder}>
          Done
        </button>
        <hr />
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}
