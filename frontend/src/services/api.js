import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
})

// Im using localStorage for simplicity in this project but would consider httpOnly cookies for enhanced security xD
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
