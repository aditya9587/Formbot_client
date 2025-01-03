import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/index.jsx";
import {
  createForm,
  fetchFormByIdApi,
  updateFormApi,
} from "../../services/formApi";
import { toast } from "react-toastify";
import style from "./Form.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

import FormBox from "../../components/FormBox/FormBox.jsx";

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
  const [searchParams] = useSearchParams();

  const [formId, setFormId] = useState(searchParams.get("wid"));
  const [clickCounts, setClickCounts] = useState({});
  const [formBox, setFormBox] = useState([]);
  const [formBoxError, setFormBoxError] = useState({});

  const navigate = useNavigate();

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };
  const copyFormLink = async () => {
    const link = `${window.location.origin}/share/${formId}`;
    try {
        await navigator.clipboard.writeText(link);
        toast.success("Form link copied successfully.");
    } catch (error) {
        handleApiErr(error, navigate);
    }
};

  async function getFormById() {
    const response = await fetchFormByIdApi(formId);
    // setFormBox(response.data.formBox)
  }
  async function handleCreateForm() {
    try {
      const response = await createForm({ fileName, selectedFolderId });
      if (response.status === 201) {
        toast.success("Form created successfully");
        navigate(`/form/?wid=${response.data.form._id}`);
        setFormId(`${response.data.form._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleFormSave() {
    if (formId) {
      if (updateFormSequence) {
        console.log("update form api called");
        await updateFormSequence();
      }
    } else {
      await handleCreateForm();
    }
  }

  //handle Add box
  const handleButtonClick = (data) => {
    console.log("buttonclick", formId);
    if (!formId) {
      toast.error("Enter form name and hit save.");
      return;
    }
    const key = `${data.role}-${data.type}`;
    const newCount = (clickCounts[key] || 0) + 1;
    setClickCounts((prevCounts) => ({ ...prevCounts, [key]: newCount }));

    setFormBox([...formBox, { key: key + ":" + newCount, data }]);
  };

  const handleRemoveBox = (index) => {
    const oldbox = formBox[index];
    const [oldKey, oldVal] = oldbox.key.split(":");

    const newbox = formBox.filter((_, idx) => idx !== index);
    const newFormBox = newbox.map((element) => {
      const [curKey, curVal] = element.key.split(":");

      if (curKey === oldKey && parseInt(curVal) > oldVal) {
        const newele = { ...element };
        newele.key = curKey + ":" + (parseInt(curVal) - 1);
        return newele;
      } else {
        return element;
      }
    });

    const newCount = (clickCounts[oldKey] || 0) - 1;
    setClickCounts((prevCounts) => ({ ...prevCounts, [oldKey]: newCount }));

    setFormBox(newFormBox);
  };

  const getFormBoxValue = (index, value) => {
    const newFormBox = formBox.map((element, idx) => {
      if (idx == index) {
        const newele = { ...element };
        newele.data.value = value;
        return newele;
      } else {
        return element;
      }
    });

    setFormBox(newFormBox);

    setFormBoxError((prevErrors) => ({
      ...prevErrors,
      [index]: value === "" ? "Required Field" : null,
    }));
  };

  const fetchFormById = async () => {
    const response = await fetchFormByIdApi(formId);
    setFileName(response.data.formName);

    if (response) setFormBox(response.data.formSequence);
  };

  const updateFormSequence = async () => {
    let error = false;
    const newErrors = {};

    formBox.forEach((element, index) => {
      const { role, type, value } = element.data;

      if (role === "admin" || (role === "user" && type === "Button")) {
        if (!value) {
          error = true;
          newErrors[index] = "Required Field";
        }
      }
    });

    setFormBoxError(newErrors);

    if (!error) {
      console.log("Payload:", { formSequence: formBox });
      const data = await updateFormApi(formId, { formSequence: formBox });
      console.log("formBox", formBox);
      console.log("data", data);
      if (data) toast.success("Form updated successfully.");
    }
  };

  useEffect(() => {
    const result = {};
    formBox.forEach((element) => {
      const { role, type } = element.data;
      const roleTypeKey = `${role}-${type}`;

      if (result[roleTypeKey]) {
        result[roleTypeKey]++;
      } else {
        result[roleTypeKey] = 1;
      }
    });

    setClickCounts(result);
  }, [formBox]);

  useEffect(() => {
    if (formId) fetchFormById();
  }, []);

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
          <button className={style.share} onClick={copyFormLink}>share</button>
          <button className={style.save} type="submit" onClick={handleFormSave}>
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

        <div className={style.formBox}>
          {formBox.map((button, index) => (
            <FormBox
              key={index}
              button={button}
              index={index}
              handleRemoveBox={handleRemoveBox}
              getFormBoxValue={getFormBoxValue}
              formBoxError={formBoxError}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
