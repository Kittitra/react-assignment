import { useState, useEffect } from "react";
import { createCategory, updateCategory } from "../../services/categoryService";

function CategoryForm({ onSuccess, editing, setEditing }) {
  const [form, setForm] = useState({ category_id: null, category_name: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editing) {
      setForm({
        category_id: editing.category_id || null,
        category_name: editing.category_name || ""
      });
    }
  }, [editing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ category_id: null, category_name: "" });
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category_name.trim()) {
      setStatus("error");
      setMessage("กรุณากรอกชื่อหมวดหมู่");
      return;
    }
    try {
      setLoading(true);
      setStatus("");
      setMessage("");
      if (editing) {
        await updateCategory(form.category_id, { category_name: form.category_name.trim() });
        setStatus("success");
        setMessage("แก้ไขหมวดหมู่สำเร็จ");
      } else {
        await createCategory({ category_name: form.category_name.trim() });
        setStatus("success");
        setMessage("เพิ่มหมวดหมู่สำเร็จ");
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
        <label className="text-sm text-gray-500">ชื่อหมวดหมู่</label>
        <input
          name="category_name"
          placeholder="กรอกชื่อหมวดหมู่"
          value={form.category_name}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      <div className="flex gap-3 pt-2 border-t border-gray-100">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "กำลังบันทึก..." : editing ? "อัปเดต" : "เพิ่มหมวดหมู่"}
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

export default CategoryForm;