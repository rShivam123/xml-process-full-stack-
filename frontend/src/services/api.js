import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const uploadXML = (formData) => API.post("/upload", formData);
export const getReports = () => API.get("/reports");
