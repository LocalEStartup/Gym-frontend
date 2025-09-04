import axios from "axios";

const API = axios.create({
  baseURL:import.meta.env.VITE_API_URL, // backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// 👉 Logout user (clear cookie from backend)
export const logout = async () => {
  return await API.post("/auth/logout", {}, { withCredentials: true });
};

export default API;
