import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// Auto sign out if token expires (401 response)
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
export const getAllOrders = async () => (await api.get("/orders")).data;
export const getOrderById = async (id) => (await api.get(`/orders/${id}`)).data;
export const createOrder = async (data) =>
  (await api.post("/orders", data)).data;
// Public endpoint - no auth needed
export const getDashboardStats = async () =>
  (await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/stats`)).data;
