import React, { useState, useEffect , useContext} from "react";
import { getForm } from "../../services/formApi";
import style from "./FormCard.module.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/index.jsx";


export default function FormCard() {

  const { selectedFolderId, setSelectedFolderId} = useContext(AppContext);

  // const [form, setForm] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    getFormData();
  }, []);

  useEffect(() => {
    console.log("Selected folder id in form" ,selectedFolderId)
    if(selectedFolderId) {
      const filteredForm = allFiles.filter((form) => form.folderId === selectedFolderId);
      console.log("filteredForm", filteredForm)
      setFilteredFiles(filteredForm);

    } else {
      setFilteredFiles(allFiles);
    }
    }, [selectedFolderId]);  


  async function getFormData() {
    try {
      const response = await getForm();
      setAllFiles(response.data);
      setFilteredFiles(response.data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={style.formCard}>
      {filteredFiles.map((form) => (
        <div
          key={form._id}
          className={style.card}
          onClick={() => navigate(`/form/?wid=${form._id}`)}
        >
          <img src="/icons/delete.png" alt="" className={style.delete} />
          <h3>{form.formName}</h3>
        </div>
      ))}
    </div>
  );
}
