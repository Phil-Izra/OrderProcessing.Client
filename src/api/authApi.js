import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});
export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
export const uploadPhoto = async (formData, token) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/upload-photo`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};
