import api from "./axiosConfig";

// =======================
// REGISTER
// POST /customers.php/register
// =======================
export const register = async (data) => {
    try {
        const res = await api.post("/customers.php/register", data);
        if (res.status !== 200) throw new Error("Registration failed");
        return res.data;
    } catch (error) {
        console.error("Register Error:", error);
        throw error;
    }
};


// =======================
// LOGIN
// POST /customers.php/login
// =======================
export const login = async (data) => {
    try {
        const res = await api.post("/customers.php/login", data);
        if (res.status !== 200) throw new Error("Login failed");
        return res.data;
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};


// =======================
// CHANGE PASSWORD
// POST /customers.php/change-password
// =======================
export const changePassword = async (data) => {
    try {
        const res = await api.post("/customers.php/change-password", data);
        if (res.status !== 200) throw new Error("Change password failed");
        return res.data;
    } catch (error) {
        console.error("Change Password Error:", error);
        throw error;
    }
};


// =======================
// GET ALL
// GET /customers.php/customers
// =======================
export const getCustomers = async () => {
    try {
        const res = await api.get("/customers.php/customers");
        if (res.status !== 200) throw new Error("Failed to fetch customers");
        return res.data;
    } catch (error) {
        console.error("Get Customers Error:", error);
        throw error;
    }
};


// =======================
// GET BY ID
// GET /customers.php/customers/1
// =======================
export const getCustomerById = async (id) => {
    try {
        const res = await api.get(`/customers.php/customers/${id}`);
        if (res.status !== 200) throw new Error("Customer not found");
        return res.data;
    } catch (error) {
        console.error("Get Customer By ID Error:", error);
        throw error;
    }
};


// =======================
// UPDATE
// PUT /customers.php/update/1
// =======================
export const updateCustomer = async (id, data) => {
    try {
        const res = await api.put(`/customers.php/update/${id}`, data);
        if (res.status !== 200) throw new Error("Update failed");
        return res.data;
    } catch (error) {
        console.error("Update Customer Error:", error);
        throw error;
    }
};


// =======================
// DELETE
// DELETE /customers.php/delete/1
// =======================
export const deleteCustomer = async (id) => {
    try {
        const res = await api.delete(`/customers.php/delete/${id}`);
        if (res.status !== 200) throw new Error("Delete failed");
        return res.data;
    } catch (error) {
        console.error("Delete Customer Error:", error);
        throw error;
    }
};