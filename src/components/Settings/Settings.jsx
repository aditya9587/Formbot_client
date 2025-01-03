import React, { useState , useEffect } from "react";
import { userDetails, updateUserDetails } from "../../services/registerApi";
import style from "./Setting.module.css";

export default function Settings() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      console.log(response);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserDetails(user);
      console.log(response);
      // fetchUserDetails();
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, [])


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
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handleInputChange}
          />
        </div>
        <div className={style.inputBox}>
          <img src="/Images/lock.png" alt="" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            name="confirmPassword"
            onChange={handleInputChange}
          />
        </div>
        <button className={style.update} onClick={handleUserDetails} type="submit">Update</button>
      </form>
      <div className={style.logout}>
        <img src="/Images/Logout.png" alt="" />
        <button>Logout</button>
      </div>
    </div>
  );
}
