import API from "./api";

export const loginUser = async (email, password) => {
  const response = await API.post("/login", { email, password });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post("/users", userData);
  return response.data;
};
