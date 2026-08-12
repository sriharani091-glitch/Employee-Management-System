import axios from "axios";

const API = "http://localhost:5000/api/employees";

export const getEmployees = () => {
  return axios.get(API);
};

export const getEmployee = (id) => {
  return axios.get(`${API}/${id}`);
};

export const addEmployee = (data) => {
  return axios.post(API, data);
};

export const updateEmployee = (id, data) => {
  return axios.put(`${API}/${id}`, data);
};

export const deleteEmployee = (id) => {
  return axios.delete(`${API}/${id}`);
};