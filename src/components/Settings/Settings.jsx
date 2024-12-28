import React from "react";
import style from "./Setting.module.css";

export default function Settings() {
  return (
    <div className={style.settings}>
      <h3>Settings</h3>
      <form className={style.formSetting}>
        <div  className={style.inputBox}>
          <img src="/Images/Profile.png" alt="" />
          <input type="text" placeholder="Username" />
        </div>
        <div className={style.inputBox}>
          <img src="/Images/lock.png" alt="" />
          <input type="email" placeholder="Email" />
        </div>
        <div className={style.inputBox}>
          <img src="/Images/lock.png" alt="" />
          <input type="password" placeholder="Password" />
        </div>
        <div  className={style.inputBox}>
          <img src="/Images/lock.png" alt="" />
          <input type="password" placeholder="Confirm Password" />
        </div>
        <button className={style.update}>Update</button>
      </form>
      <div className={style.logout}>
        <img src="/Images/Logout.png" alt="" />
        <button>Logout</button>
      </div>
    </div>
  );
}
