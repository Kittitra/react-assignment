import api from "./axiosConfig";

// =======================
// GET ALL
// GET /product.php
// =======================
export const getProducts = async () => {
    try {
        const res = await api.get("/product.php");
        if (res.status !== 200) throw new Error("Failed to fetch products");
        return res.data;
    } catch (error) {
        console.error("Get Products Error:", error);
        throw error;
    }
};


// =======================
// GET BY ID
// GET /product.php/1
// =======================
export const getProductById = async (id) => {
    try {
        const res = await api.get(`/product.php/${id}`);
        if (res.status !== 200) throw new Error("Product not found");
        return res.data;
    } catch (error) {
        console.error("Get Product By ID Error:", error);
        throw error;
    }
};


// =======================
// CREATE
// POST /product.php
// =======================
export const createProduct = async (data) => {
    try {
        const res = await api.post("/product.php", data);
        if (res.status !== 200) throw new Error("Creation failed");
        return res.data;
    } catch (error) {
        console.error("Create Product Error:", error);
        throw error;
    }
};


// =======================
// UPDATE
// PUT /product.php/1
// =======================
export const updateProduct = async (id, data) => {
    try {
        const res = await api.put(`/product.php/${id}`, data);
        if (res.status !== 200) throw new Error("Update failed");
        return res.data;
    } catch (error) {
        console.error("Update Product Error:", error);
        throw error;
    }
};


// =======================
// DELETE
// DELETE /product.php/1
// =======================
export const deleteProduct = async (id) => {
    try {
        const res = await api.delete(`/product.php/${id}`);
        if (res.status !== 200) throw new Error("Delete failed");
        return res.data;
    } catch (error) {
        console.error("Delete Product Error:", error);
        throw error;
    }
};