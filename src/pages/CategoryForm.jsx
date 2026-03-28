import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost/api/controllers/categories.php";

function CategoryForm({ onSuccess, editing, setEditing }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.category_name);
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await axios.put(API, {
        category_id: editing.category_id,
        category_name: name
      });
    } else {
      await axios.post(API, {
        category_name: name
      });
    }

    setName("");
    setEditing(null);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="ชื่อประเภท"
      />

      <button type="submit">
        {editing ? "อัปเดต" : "เพิ่ม"}
      </button>
    </form>
  );
}

export default CategoryForm;