import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem("access_token", response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Unable to refresh token, redirecting to login...");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const register = async (userData) => {
  const response = await api.post("/register/", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post("/login/", userData);
  localStorage.setItem("access_token", response.data.access);
  localStorage.setItem("refresh_token", response.data.refresh);
  return response.data;
};

export const getScholarships = async () => {
  const response = await api.get("/scholarships/");
  return response.data;
};

export const getScholarshipById = async (id) => {
  const response = await api.get(`/scholarships/${id}/`);
  return response.data;
};

export const createScholarship = async (scholarshipData) => {
  const response = await api.post("/scholarships/", scholarshipData);
  return response.data;
};

export const updateScholarship = async (id, scholarshipData) => {
  const response = await api.put(`/scholarships/${id}/`, scholarshipData);
  return response.data;
};

export const deleteScholarship = async (id) => {
  const response = await api.delete(`/scholarships/${id}/`);
  return response.data;
};

export const getApplications = async () => {
  const response = await api.get("/applications/");
  return response.data;
};

export const getApplicationById = async (id) => {
  const response = await api.get(`/applications/${id}/`);
  return response.data;
};

export const createApplication = async (formData) => {
  const response = await api.post("/applications/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};


export const updateApplicationStatus = async (applicationId, newStatus) => {
  try {
    const response = await api.patch(
      `/applications/${applicationId}/`, {status:newStatus},
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );
    console.log("Status updated successfully:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error updating status:", error);
    throw error; 
  }
};
export const deleteApplication = async (id) => {
  console.log(id);
  
  const response = await api.delete(`/applications/${id}/`);
  return response.data;
};
