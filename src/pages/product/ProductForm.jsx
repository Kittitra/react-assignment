import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../../services/productService";

function ProductForm({ onSuccess, editing, setEditing }) {
  const [form, setForm] = useState({
    product_id: null,
    product_name: "",
    rental_price_per_day: "",
    category_id: "",
    description: "",
    image: ""
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
        product_id: editing.product_id || null,
        product_name: editing.product_name || "",
        rental_price_per_day: editing.rental_price_per_day || "",
        category_id: editing.category_id?.toString() || "",
        description: editing.description || "",
        image: editing.image || ""
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
      product_id: null,
      product_name: "",
      rental_price_per_day: "",
      category_id: "",
      description: "",
      image: ""
    });
    setEditing(null);
  };

  // =========================
  // submit
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate
    if (!form.product_name || !form.rental_price_per_day || !form.category_id) {
      setStatus("error");
      setMessage("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const payload = {
      product_name: form.product_name.trim(),
      description: form.description.trim(),
      rental_price_per_day: Number(form.rental_price_per_day),
      category_id: parseInt(form.category_id.trim()), // 🔥 กัน FK พัง
      image: form.image?.trim() || "" // 🔥 กัน NULL
    };

    console.log("payload:", payload); // debug

    try {
      setLoading(true);
      setStatus("");
      setMessage("");

      if (editing) {
        await updateProduct(form.product_id, payload);
        setStatus("success");
        setMessage("แก้ไขสินค้าสำเร็จ ✅");
      } else {
        await createProduct(payload);
        setStatus("success");
        setMessage("เพิ่มสินค้าสำเร็จ ✅");
      }

      setTimeout(() => {
        resetForm();
        onSuccess();
      }, 800);

    } catch (err) {
      console.error("Submit Error:", err.response?.data || err);
      setStatus("error");
      setMessage("บันทึกข้อมูลไม่สำเร็จ ❌");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <form onSubmit={handleSubmit} style={{ width: "400px" }} className="flex flex-col gap-3">
      <h3>{editing ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}</h3>

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
        <div>
            <label >ชื่อสินค้า: </label>
            {/* product name */}
            <input
                name="product_name"
                placeholder="ชื่อสินค้า"
                value={form.product_name}
                onChange={handleChange}
            />
        </div>

         <div>
            <label >ราคา/วัน: </label>
            {/* price */}
            <input
                type="number"
                name="rental_price_per_day"
                placeholder="ราคา/วัน"
                value={form.rental_price_per_day}
                onChange={handleChange}
            />
         </div>
         
         <div>
            <label >หมวดหมู่: </label>
            {/* category */}
            <input
                name="category_id"
                placeholder="category_id"
                value={form.category_id}
                onChange={handleChange}
            />
         </div>

        <div>
            <label >รายละเอียด: </label>
            {/* description */}
            <input
                name="description"
                placeholder="รายละเอียด"
                value={form.description}
                onChange={handleChange}
            />
        </div>
         
         <div>
            <label >Image URL: </label>
            {/* image */}
            <input
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
            />
         </div>

      {/* buttons */}
      <div style={{ marginTop: "10px" }} className="flex w-full justify-between flex-row">
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

export default ProductForm;