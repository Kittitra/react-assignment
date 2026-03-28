import api from "./axiosConfig";

// =======================
// GET ALL ITEM
// =======================
export const getProductItems = async () => {
  try {
    const res = await api.get("/product_item.php");

    if (res.status !== 200) {
      throw new Error("Failed to fetch product items");
    }

    return res.data;

  } catch (err) {
    console.error("Get ProductItems Error:", err.message);
    throw err;
  }
};


// =======================
// GET BY ID
// =======================
export const getProductItemById = async (id) => {
  try {
    const res = await api.get(`/product_item.php/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get ProductItem By ID Error:", err);
    throw err;
  }
};


// =======================
// GET AVAILABLE ONLY 
// =======================
export const getAvailableItems = async () => {
  try {
    const res = await api.get("/product_item.php/available");
    return res.data;
  } catch (err) {
    console.error("Get Available Items Error:", err);
    throw err;
  }
};


// =======================
// CREATE
// =======================
export const createProductItem = async (data) => {
  try {
    const res = await api.post("/product_item.php", data);
    return res.data;
  } catch (err) {
    console.error("Create ProductItem Error:", err);
    throw err;
  }
};


// =======================
// UPDATE
// =======================
export const updateProductItem = async (id, data) => {
  try {
    const res = await api.put(`/product_item.php/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Update ProductItem Error:", err);
    throw err;
  }
};


// =======================
// DELETE
// =======================
export const deleteProductItem = async (id) => {
  try {
    const res = await api.delete(`/product_item.php/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete ProductItem Error:", err);
    throw err;
  }
};