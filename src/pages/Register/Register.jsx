import React, { useState } from "react";
import { userSignup, userLogin } from "../../services/registerApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";

export default function Register() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [signupForm, setSignupForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const validateSignup = () => {
    if (signupForm.userName.length < 3) {
      toast.error("Username is required atleast 3 characters");
      return false;
    }
    if (!signupForm.email) {
      toast.error("Email is required must contain @ and .");
      return false;
    }
    if (signupForm.password.length < 8) {
      toast.error("Password is required atleast 8 characters");
      return false;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error("Password does not match");
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!loginForm.email) {
      toast.error("Email is required must contain @ and .");
      return false;
    }
    if (loginForm.password.length < 8) {
      toast.error("Password is required atleast 8 characters");
      return false;
    }
    return true;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Validating Signup Form:", signupForm);
    if (validateSignup()) {
      try {
        const response = await userSignup(signupForm);
        if (response.status === 200) {
         
          toast.success("Signup successful");
          
          setShowForm(false);
        }
      } catch (error) {
        toast.error("Signup failed");
        console.error("Signup failed", error);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateLogin()) {
      try {
        const response = await userLogin(loginForm);
        if (response.status === 200) {
          navigate("/home");
          localStorage.setItem("token", response.data.token);
          toast.success("Login successful");
          setShowForm(false);
        }
      } catch (error) {
        toast.error("Login failed");
        console.error("Login failed", error);
      }
    }
  };

  return (
    <div className={style.container}>
      {showForm ? (
        <div>
          <form className={style.registerForm} onSubmit={handleSignup}>
            <label>
              UserName
              <input
                type="text"
                placeholder="Name"
                name="userName"
                value={signupForm.userName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signupForm.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={signupForm.password}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Confirm Password
              <input
                type="text"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={signupForm.confirmPassword}
                onChange={handleInputChange}
              />
            </label>

            <button type="submit">Sign Up</button>
          </form>
          <p className={style.or}>OR</p>
          <div className={style.googleBtn}>
            <img src="/Images/Google_Icon.png" alt="" />
            <button type="disabled">Sign Up with Google</button>
          </div>
          <p>
            Already have an account?{" "}
            <span
              className={style.registerNow}
              onClick={() => setShowForm(false)}
            >
              {" "}
              Login{" "}
            </span>
          </p>
        </div>
      ) : (
        <div>
          <form className={style.registerForm} onSubmit={handleLogin}>
            <label>
              Email
              <input
                type="text"
                placeholder="Enter your Email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginInputChange}
              />
            </label>
            <label>
              Password
              <input
                type="text"
                placeholder="Enter yourPassword"
                name="password"
                value={loginForm.password}
                onChange={handleLoginInputChange}
              />
            </label>
            <button type="submit">Login</button>
          </form>
          <p className={style.or}>OR</p>
          <div className={style.googleBtn}>
            <img src="/Images/Google_Icon.png" alt="" />
            <button type="disabled">Sign In with Google</button>
          </div>
          <p>
            Don’t have an account?{" "}
            <span
              className={style.registerNow}
              onClick={() => setShowForm(true)}
            >
              {" "}
              Register now{" "}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
