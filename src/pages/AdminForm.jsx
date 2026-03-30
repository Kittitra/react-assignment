import { useState, useEffect } from "react";
import { createAdmin, updateAdmin } from "../services/adminService";

function AdminForm({ onSuccess, editing, setEditing }) {
  const [form, setForm] = useState({
    admin_id: null,
    admin_name: "",
    email: "",
    password: "",
    role: "staff",
    status: "active"
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editing) {
      setForm({
        admin_id: editing.admin_id || null,
        admin_name: editing.admin_name || "",
        email: editing.email || "",
        password: "",
        role: editing.role || "staff",
        status: editing.status || "active"
      });
    }
  }, [editing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ admin_id: null, admin_name: "", email: "", password: "", role: "staff", status: "active" });
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.admin_name || !form.email || (!editing && !form.password)) {
      setStatus("error");
      setMessage("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    try {
      setLoading(true);
      setStatus("");
      setMessage("");

      const payload = {
        admin_name: form.admin_name,
        email: form.email,
        role: form.role,
        status: form.status,
        ...(form.password && { password: form.password })
      };

      if (editing) {
        await updateAdmin(form.admin_id, payload);
        setStatus("success");
        setMessage("แก้ไข Admin สำเร็จ");
      } else {
        await createAdmin({ ...payload, password: form.password });
        setStatus("success");
        setMessage("เพิ่ม Admin สำเร็จ");
      }
      setTimeout(() => { resetForm(); onSuccess(); }, 800);
    } catch (err) {
      setStatus("error");
      setMessage("บันทึกไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {message && (
        <div className={`text-sm px-4 py-3 rounded-lg ${
          status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>
          {message}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500">ชื่อ Admin</label>
        <input
          name="admin_name"
          placeholder="กรอกชื่อ Admin"
          value={form.admin_name}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500">Email</label>
        <input
          name="email"
          type="email"
          placeholder="กรอก Email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500">
          Password {editing && <span className="text-gray-400">(เว้นว่างถ้าไม่เปลี่ยน)</span>}
        </label>
        <input
          name="password"
          type="password"
          placeholder={editing ? "เว้นว่างถ้าไม่เปลี่ยน" : "กรอก Password"}
          value={form.password}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
          >
            <option value="staff">Staff</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2 border-t border-gray-100">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "กำลังบันทึก..." : editing ? "อัปเดต" : "เพิ่ม Admin"}
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ล้างค่า
        </button>
      </div>

    </form>
  );
}

export default AdminForm;