import API from "./api";

// Add Product (with image upload)
export const addProduct = async (formData) => {
  return await API.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Get active products
export const getProducts = async () => {
  return await API.get("/products");
};

// Deactivate product
export const deactivateProduct = async (id) => {
  return await API.put(`/products/deactivate/${id}`);
};

// Activate product
export const activateProduct = async (id) => {
  return await API.put(`/products/activate/${id}`);
};
