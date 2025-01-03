import axios from "axios";

export const createFolder = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/folder/create`,
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

export const getFolder = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/folder/get`,{
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = async (folderId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/folder/delete/${folderId}`,{
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Axios Error:",error);
    return res.status(500).json({ message: " APi call error" });
  }
}