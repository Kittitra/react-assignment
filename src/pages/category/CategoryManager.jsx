import { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import {
  getCategories,
  deleteCategory
} from "../../services/categoryService";

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      alert("โหลดข้อมูลไม่สำเร็จ");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("ยืนยันการลบ?")) return;

    try {
      await deleteCategory(id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("ลบไม่สำเร็จ");
    }
  };

  // ======================
  // OPEN / CLOSE MODAL
  // ======================
  const openAdd = () => {
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
  };

  return (
    <div>
      <h2>จัดการหมวดหมู่</h2>

      <button onClick={openAdd}>+ เพิ่มหมวดหมู่</button>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px", marginTop: "20px"}} border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr key={c.category_id} style={{ background: "#f9f9f9" }}>
              <td style={tdStyle}>{c.category_id}</td>
              <td style={tdStyle}>{c.category_name}</td>
              <td style={tdStyle}>
                <button onClick={() => openEdit(c)}>แก้ไข</button>
                <button onClick={() => handleDelete(c.category_id)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <CategoryForm
              onSuccess={() => {
                fetchData();
                closeModal();
              }}
              editing={editing}
              setEditing={setEditing}
            />

            <button onClick={closeModal} style={{ marginTop: "10px" }}>
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #ccc"
};

const tdStyle = {
  padding: "10px",
  background: "white"
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px"
};

export default CategoryManager;