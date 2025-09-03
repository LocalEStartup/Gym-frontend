import API from "./api"
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const toggleActive = (id) => API.patch(`/products/${id}/toggle-active`);
export const updateProduct = (id, formData) =>
  API.put(`/products/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteProductPermanent = (id) => API.delete(`/products/${id}`);
