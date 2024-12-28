import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Home.module.css";
import {
  getFolder,
  deleteFolder,
  createFolder,
} from "../../services/folderApi";
import { AppContext } from "../../context/index.jsx";
import FormCard from "../../components/formCard/FormCard.jsx";

import FolderModal from "../../components/FolderModal/FolderModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

export default function Home() {
  const navigate = useNavigate();

  const { folderName, setFolder, selectedFolderId, setSelectedFolderId } =
    useContext(AppContext);

  const [AllFolders, setAllFolders] = useState([]);

  const [deleteFolderId, setDeleteFolderId] = useState(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  function handleFolderModalClose() {
    setFolderModalOpen(false);
  }

  function handleDeleteModalClose() {
    setDeleteModalOpen(false);
    setDeleteFolderId(null);
  }

  const handleCreateFolder = async () => {
    try {
      const response = await createFolder({ folderName });
      handleFolderModalClose();
      fetchFolders();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  async function handleFolderDelete() {
    setDeleteModalOpen(true);
    const folder = await deleteFolder(deleteFolderId);
    setAllFolders((prevFolders) =>
      prevFolders.filter((folder) => folder._id !== deleteFolderId)
    );
    handleDeleteModalClose();
    fetchFolders();
  }

  function deleteFolderHandler(folderId) {
    setDeleteFolderId(folderId);
    setDeleteModalOpen(true);
  }

  const fetchFolders = async () => {
    try {
      const response = await getFolder();
      console.log(response);
      setAllFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  function handleFolderClick(folderId) {
    // setFolderOpen(!folderOpen);  
    // navigate(`/home/${folderId}`);
    // setSelectedFolderId((prevfolderId) => prevfolderId === folderId ? null : folderId);
    // if ( selectedFolderId !== folderId) {
    //   setSelectedFolderId(folderId);
    // } else {
    //   setSelectedFolderId((prevfolderId) => prevfolderId === folderId ? null : folderId);
    // }
    // console.log(folderId);

    setSelectedFolderId(folderId)

  }

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div className={style.home}>
      <div className={style.navbar}>
        <h1>Navbar</h1>

        <div
          className={`${style.dropdown} ${isDropdownOpen ? style.active : ""}`}
        >
          <button
            className={style.dropbtn}
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <span>userWorkspace </span>
            <img src="/icons/arrow.png" alt="" className={style.arrow} />
          </button>
          <div className={style.dropdownContent}>
            <Link to={"/setting"} className={style.settings}>
              Settings
            </Link>
            <Link to="/Logout" className={style.logout}>
              Logout
            </Link>
          </div>
        </div>

        <button className={style.share}>Share</button>
      </div>
      <hr />

      <div className={style.container}>
        <div className={style.folder}>
          <div
            className={style.newFolder}
            onClick={() => setFolderModalOpen(true)}
          >
            <img src="/icons/folder.png" alt="" />
            <p> Create new Folder</p>
          </div>

          {AllFolders.map((folder) => (
            <div
              key={folder._id}
              className={`${style.folderItem} ${
                selectedFolderId === folder._id ? style.selectedFolder : ""
              }`}
            >
              <p onClick={() => handleFolderClick(folder._id)}>
                {folder.folderName}
              </p>
              <img
                src="/icons/delete.png"
                alt=""
                className={style.delete}
                onClick={() => deleteFolderHandler(folder._id)}
              />
            </div>
          ))}
        </div>

        <div className={style.newFile}>
          <div className={style.newFiles} onClick={() => navigate(`/form/${selectedFolderId}`)}>
            <img src="/icons/Add.png" alt="" className={style.add} />
            <p> Create a typeBot</p>
          </div>

          {isFolderModalOpen && (
            <FolderModal
              closeModal={handleFolderModalClose}
              createFolder={handleCreateFolder}
            />
          )}
          {isDeleteModalOpen && (
            <DeleteModal
              closeDeleteModal={handleDeleteModalClose}
              deleteFolder={handleFolderDelete}
            />
          )}
          <FormCard />
        </div>
      </div>
    </div>
  );
}
