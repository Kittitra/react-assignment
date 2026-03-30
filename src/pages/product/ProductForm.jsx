import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../../services/productService";

function ProductForm({ onSuccess, editing, setEditing }) {
  const [form, setForm] = useState({
    product_id: null,
    product_name: "",
    rental_price_per_day: "",
    category_id: "",
    description: "",
    image_url: "",
    quantity: 1,
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
        image_url: editing.image_url || "",
        quantity: editing.total_items || 1,
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
      image_url: ""
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
      image_url: form.image_url?.trim() || "", // 🔥 กัน NULL
      quantity: Number(form.quantity) || 1,
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
    <div className="flex justify-center items-start p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-7 w-full max-w-md">

        <h3 className="text-lg font-medium mb-6">
            {editing ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
        </h3>

        {/* notification */}
        {message && (
            <div className={`text-sm px-4 py-3 rounded-lg mb-5 ${
            status === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}>
            {message}
            </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* ชื่อสินค้า */}
            <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">ชื่อสินค้า</label>
            <input
                name="product_name"
                placeholder="กรอกชื่อสินค้า"
                value={form.product_name}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            </div>

            {/* ราคา + หมวดหมู่ */}
            <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">ราคา / วัน (฿)</label>
                <input
                type="number"
                name="rental_price_per_day"
                placeholder="0"
                value={form.rental_price_per_day}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">หมวดหมู่</label>
                <input
                name="category_id"
                placeholder="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
            </div>
            </div>

            {/* รายละเอียด */}
            <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">รายละเอียด</label>
            <textarea
                name="description"
                placeholder="รายละเอียดสินค้า..."
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full resize-none focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            </div>

            {/* Image URL */}
            <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Image URL</label>
            <input
                name="image_url"
                placeholder="https://..."
                value={form.image_url}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">จำนวนชิ้น</label>
                <input
                    type="number"
                    name="quantity"
                    min="1"
                    placeholder="1"
                    value={form.quantity}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
            </div>

            {/* buttons */}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
            <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? "กำลังบันทึก..." : editing ? "อัปเดต" : "เพิ่มสินค้า"}
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
        </div>
    </div>
  );
}

export default ProductForm;