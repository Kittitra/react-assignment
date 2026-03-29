import { useState } from "react";
import { createAdmin } from "../services/adminService"; // ต้องมี service นี้

export default function AddAdmin() {
  const [formData, setFormData] = useState({
    admin_name: "",
    email: "",
    password: "",
    role: "staff",
    status: "active",
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showNotification = (msg, type) => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createAdmin(formData);
      if (result.success) {
        showNotification("เพิ่ม Admin สำเร็จ!", "success");
        setFormData({ admin_name: "", email: "", password: "", role: "staff", status: "active" });
      } else {
        showNotification(result.message || "เกิดข้อผิดพลาด", "error");
      }
    } catch {
      showNotification("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      {toast.show && (
        <div className={`fixed top-5 right-5 px-5 py-3 rounded-lg text-white shadow-lg ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md flex flex-col gap-4 w-96">
        <h1 className="text-2xl font-bold text-center">เพิ่มบัญชี Admin</h1>

        {/* Admin Name */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">ชื่อ Admin</label>
          <input
            name="admin_name"
            type="text"
            placeholder="กรอกชื่อ Admin"
            value={formData.admin_name}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Email</label>
          <input
            name="email"
            type="email"
            placeholder="กรอก Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Password</label>
          <input
            name="password"
            type="password"
            placeholder="กรอก Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="staff">Staff</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg p-2 mt-2 hover:bg-blue-600 hover:cursor-pointer"
        >
          เพิ่ม Admin
        </button>
      </form>
    </div>
  );
}