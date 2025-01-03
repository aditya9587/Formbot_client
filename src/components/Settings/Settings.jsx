import React, { useState, useEffect } from "react";
import { userDetails, updateUserDetails } from "../../services/registerApi";
import style from "./Setting.module.css";
import { toast } from "react-toastify";

export default function Settings() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const fetchUserDetails = async () => {
    try {
      const response = await userDetails();
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };


  const handleUserDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserDetails(user);
      if (response.status === 200){
        toast.success("User details updated successfully");
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/register";
  }

  return (
    <div className={style.settings}>
      <h3>Settings</h3>
      <form className={style.formSetting}>
        <div className={style.inputBox}>
          <img src="/Images/Profile.png" alt="" />
          <input
            type="text"
            placeholder="UserName"
            value={user.userName}
            name="userName"
            onChange={handleInputChange}
          />
        </div>
        <div className={style.inputBox}>
          <img src="/Images/lock.png" alt="" />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={handleInputChange}
          />
        </div>
        <div className={style.inputBox}>
          <img src="/Images/lock.png" alt="" />
          <input
            type="text"
            placeholder="Old Password"
            value={user.oldPassword}
            name="oldPassword"
            onChange={handleInputChange}
          />
        </div>
        <div className={style.inputBox}>
          <img src="/Images/lock.png" alt="" />
          <input
            type="text"
            placeholder="New Password"
            value={user.newPassword}
            name="newPassword"
            onChange={handleInputChange}
          />
        </div>
        <button
          className={style.update}
          onClick={handleUserDetails}
          type="submit"
        >
          Update
        </button>
      </form>
      <div className={style.logout}>
        <img src="/Images/Logout.png" alt="" />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
