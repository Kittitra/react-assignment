import api from "./axiosConfig";

// =======================
// GET ALL
// =======================
export const getCategories = async () => {
    try {
        const res = await api.get("/categories.php");

        if (res.status !== 200) {
            throw new Error("Failed to fetch categories");
        }
        return res.data;

    } catch (err) {
        console.error("Get Categories Error:", err.message);
        throw err;
    }
};

// =======================
// GET BY ID
// =======================
export const getCategoryById = async (id) => {
  try {
    const res = await api.get(`/categories.php/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get Category By ID Error:", err);
    throw err;
  }
};


// =======================
// CREATE
// =======================
export const createCategory = async (data) => {
  try {
    const res = await api.post("/categories.php", data);
    return res.data;
  } catch (err) {
    console.error("Create Category Error:", err);
    throw err;
  }
};


// =======================
// UPDATE
// =======================
export const updateCategory = async (id, data) => {
  try {
    const res = await api.put(`/categories.php/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Update Category Error:", err);
    throw err;
  }
};


// =======================
// DELETE
// =======================
export const deleteCategory = async (id) => {
  try {
    const res = await api.delete(`/categories.php/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete Category Error:", err);
    throw err;
  }
};

