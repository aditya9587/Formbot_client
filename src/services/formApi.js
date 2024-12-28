import axios from "axios";

export const createForm = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/form/formCreate`,
      data,{
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getForm = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/form/formGet`,{
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};