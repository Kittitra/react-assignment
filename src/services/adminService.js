import api from "./axiosConfig"; // axios instance ของคุณ

export const loginAdmin = async (email, password) => {
  try {
    const res = await api.post("/admin.php/login", {
      email,
      password,
    });

    return res.data;
  } catch (err) {
    console.error("Admin Login Error:", err);
    throw err;
  }
};

export const createAdmin = async (data) => {
  const res = await api.post("/admin.php", {
    admin_name: data.admin_name,
    email: data.email,
    password: data.password,
    role: data.role
    // ❌ ไม่ส่ง status เพราะ PHP ไม่ได้รับ
  });
  return res.data;
};