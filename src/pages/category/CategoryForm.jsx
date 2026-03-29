import { useState, useEffect } from "react";
import {
  createCategory,
  updateCategory
} from "../../services/categoryService";

function CategoryForm({ onSuccess, editing, setEditing }) {
  const [form, setForm] = useState({
    category_id: null,
    category_name: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // success | error
  const [message, setMessage] = useState("");

  // =========================
  // โหลดข้อมูลตอนแก้ไข
  // =========================
  useEffect(() => {
    if (editing) {
      setForm({
        category_id: editing.category_id || null,
        category_name: editing.category_name || ""
      });
    }
  }, [editing]);

  // =========================
  // handle change
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // reset form
  // =========================
  const resetForm = () => {
    setForm({
      category_id: null,
      category_name: ""
    });
    setEditing(null);
  };

  // =========================
  // submit
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate
    if (!form.category_name.trim()) {
      setStatus("error");
      setMessage("กรุณากรอกชื่อหมวดหมู่");
      return;
    }

    const payload = {
      category_name: form.category_name.trim()
    };

    try {
      setLoading(true);
      setStatus("");
      setMessage("");

      if (editing) {
        await updateCategory(form.category_id, payload);
        setStatus("success");
        setMessage("แก้ไขหมวดหมู่สำเร็จ");
      } else {
        await createCategory(payload);
        setStatus("success");
        setMessage("เพิ่มหมวดหมู่สำเร็จ");
      }

      setTimeout(() => {
        resetForm();
        onSuccess();
      }, 800);

    } catch (err) {
      console.error("Submit Error:", err);
      setStatus("error");
      setMessage("บันทึกไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "300px" }}>
      <h3>{editing ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่"}</h3>

      {/* status */}
      {message && (
        <div style={{
          padding: "10px",
          marginBottom: "10px",
          background: status === "success" ? "#d4edda" : "#f8d7da",
          color: status === "success" ? "#155724" : "#721c24",
          borderRadius: "5px"
        }}>
          {message}
        </div>
      )}

      {/* category name */}
      <input
        name="category_name"
        placeholder="ชื่อหมวดหมู่"
        value={form.category_name}
        onChange={handleChange}
      />

      {/* buttons */}
      <div style={{ marginTop: "10px" }}>
        <button type="submit" disabled={loading}>
          {loading ? "กำลังบันทึก..." : editing ? "อัปเดต" : "เพิ่ม"}
        </button>

        <button type="button" onClick={resetForm}>
          ล้างค่า
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;