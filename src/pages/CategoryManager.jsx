import { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "./CategoryForm";

const API = "http://localhost/api/controllers/categories.php";

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(API);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${API}?id=${id}`);
    fetchData();
  };

  return (
    <div>
      <h2>จัดการประเภทสินค้า</h2>

      <CategoryForm
        onSuccess={fetchData}
        editing={editing}
        setEditing={setEditing}
      />

      <ul>
        {categories.map((c) => (
          <li key={c.category_id}>
            {c.category_name}
            <button onClick={() => setEditing(c)}>แก้ไข</button>
            <button onClick={() => handleDelete(c.category_id)}>
              ลบ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryManager;