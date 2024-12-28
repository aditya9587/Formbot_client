import axios from "axios";

export const userSignup = async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/signup`, data,{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (error) {
    console.log(error)
  }

};

export const userLogin = async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, data,{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }

}