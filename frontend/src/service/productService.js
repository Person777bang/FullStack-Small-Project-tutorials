import api from "./api";

export const getProducts = async (search = "", page = 1, limit = 10) => {
  const response = await api.get(
    `/products?search_query=${encodeURIComponent(search)}&page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data) => {
  const response = await api.post("/products", data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await api.patch(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
