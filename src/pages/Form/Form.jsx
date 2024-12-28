import React, { useState, useContext } from "react";
import { AppContext } from "../../context/index.jsx";
import { createForm } from "../../services/formApi";
import style from "./Form.module.css";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const inputButtons = [
    {
      role: "user",
      src: "InputText.png",
      type: "Text",
      hint: "input a text on his form",
    },
    {
      role: "user",
      src: "hash.png",
      type: "Number",
      hint: "input a number on his form",
    },
    {
      role: "user",
      src: "at.png",
      type: "Email",
      hint: "input a email on his form",
    },
    {
      role: "user",
      src: "phone.png",
      type: "Phone",
      hint: "input a phone on his form",
    },
    { role: "user", src: "date.png", type: "Date", hint: "select a date" },
    {
      role: "user",
      src: "rating.png",
      type: "Rating",
      hint: "tap to rate out of 5",
    },
    {
      role: "user",
      src: "buttons.png",
      type: "Button",
      hint: "Click to add button text",
      value: "",
    },
  ];

  const bubbles = [
    {
      role: "admin",
      src: "text.png",
      type: "Text",
      hint: "Click here to edit",
      value: "",
    },
    {
      role: "admin",
      src: "Image.png",
      type: "Image",
      hint: "Click to add link",
      value: "",
    },
    {
      role: "admin",
      src: "video.png",
      type: "Video",
      hint: "Click to add link",
      value: "",
    },
    {
      role: "admin",
      src: "gif.png",
      type: "GIF",
      hint: "Click to add link",
      value: "",
    },
  ];
  const { fileName, setFileName, selectedFolderId } = useContext(AppContext);

  const [formInput, setFormInput] = useState([]);

  const navigate = useNavigate();

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  async function handleCreateForm() {
    try {
      const response = await createForm({ fileName, selectedFolderId });
      navigate(`/form/${response.data.form._id}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  function handleButtonClick(button) {
    setFormInput((prevInput) => [...prevInput, button]);
  }
  return (
    <div>
      <div className={style.navbar}>
        <input
          type="text"
          placeholder="Enter Form Name"
          className={style.formName}
          name="fileName"
          value={fileName}
          onChange={handleFileNameChange}
        />

        <div className={style.Actionbutton}>
          <button>Flow</button>
          <button>Response</button>
        </div>

        <div className={style.shareButtons}>
          <p>Light Dark</p>
          <button className={style.share}>share</button>
          <button
            className={style.save}
            type="submit"
            onClick={handleCreateForm}
          >
            save
          </button>
          <img
            src="/icons/close.png"
            alt=""
            className={style.close}
            onClick={() => navigate("/home")}
          />
        </div>
      </div>

      <div className={style.formContainer}>
        <div className={style.formButtons}>
          <p>Bubbles</p>
          <div className={style.bubbles}>
            {bubbles.map((button, index) => (
              <button key={index} onClick={() => handleButtonClick(button)}>
                <img src={`/icons/${button.src}`} alt="" />
                {button.type}
              </button>
            ))}
          </div>

          <p>Inputs</p>
          <div className={style.bubbles}>
            {inputButtons.map((button, index) => (
              <button key={index} onClick={() => handleButtonClick(button)}>
                <img src={`/icons/${button.src}`} alt="" />
                {button.type}
              </button>
            ))}
          </div>
        </div>

        <div className={style.formInput} >
          {formInput.map((button, index) => (
            <div key={index} className={style.input} >
              {/* <img src={`/icons/${button.src}`} alt="" /> */}
              {button.type}
              <div>
              {button.role === "admin" ? (
              <input type="text" id={index} placeholder={button.hint} value={button.value} onChange={(e) => setFormInput(button.value = e.target.value)} />):( " ")
              } 
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
