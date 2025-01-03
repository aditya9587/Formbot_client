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
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFormByIdApi = async (formId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/form/formData/${formId}`,{
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateFormApi = async (formId, formSequence) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/form/formUpdate/${formId}`,
      formSequence,{
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const countFormHitApi = async (formId) => {
  try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/form/hits/${formId}`);

      const { status, msg } = response.data;
      if (status === 'success') {
          return msg;
      } else {
          handleApiRes(response.data);
      }
  } catch (error) {
      // handleApiErr(error, navigate);
  }
};

export const shareFormApi = async (formId) => {
  try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/form/share/${formId}`);

      const { status, data } = response.data;
      if (status === 'success') {
          return data;
      } else {
          handleApiRes(response.data);
      }
  } catch (error) {
      // handleApiErr(error, navigate);
  }
};

export const saveFormResponseApi = async (formId, formResponse) => {
  console.log(formResponse)
  try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/form/response/${formId}`, formResponse);

      const { status, msg, data } = response.data;
      if (status === 'success') {
          return data;
      } else {
          handleApiRes(response.data);
      }
  } catch (error) {
      // handleApiErr(error, navigate);
  }
};