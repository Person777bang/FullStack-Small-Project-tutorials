import api from "./api";

export const getUsers = async (search = "", page = 1, limit = 10) => {
  const response = await api.get(
    `/users?search_query=${encodeURIComponent(search)}&page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (data) => {
  const response = await api.post("/users", data);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await api.patch(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
