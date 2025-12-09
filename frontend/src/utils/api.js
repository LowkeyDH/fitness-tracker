import axios from "axios";

const API_URL = "http://localhost:3000/api";

const api = axios.create({
   baseURL: API_URL,
});

api.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);

export const getWorkouts = () => api.get("/workouts");
export const getWorkout = (id) => api.get(`/workouts/${id}`);
export const createWorkout = (data) => api.post("/workouts", data);
export const updateWorkout = (id, data) => api.put(`/workouts/${id}`, data);
export const deleteWorkout = (id) => api.delete(`/workouts/${id}`);

export default api;
