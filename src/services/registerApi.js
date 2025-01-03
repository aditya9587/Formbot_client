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

export const userDetails = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`,{
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }

}

export const updateUserDetails = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/update`, data,{
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}