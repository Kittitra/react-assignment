import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost/api/controllers/products.php";

function ProductForm({ onSuccess, editing, setEditing }) {
  const [form, setForm] = useState({
    product_name: "",
    rental_price_per_day: "",
    category_id: ""
  });

  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await axios.put(API, form); // update
    } else {
      await axios.post(API, form); // create
    }

    setForm({
      product_name: "",
      rental_price_per_day: "",
      category_id: ""
    });

    setEditing(null);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="product_name"
        placeholder="ชื่อสินค้า"
        value={form.product_name}
        onChange={handleChange}
      />

      <input
        name="rental_price_per_day"
        placeholder="ราคา"
        value={form.rental_price_per_day}
        onChange={handleChange}
      />

      <input
        name="category_id"
        placeholder="category_id"
        value={form.category_id}
        onChange={handleChange}
      />

      <button type="submit">
        {editing ? "อัปเดต" : "เพิ่ม"}
      </button>
    </form>
  );
}

export default ProductForm;