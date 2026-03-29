import { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import { getCategories, deleteCategory } from "../../services/categoryService";

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
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("ยืนยันการลบ?")) return;
    try {
      await deleteCategory(id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const openAdd = () => { setEditing(null); setShowModal(true); };
  const openEdit = (c) => { setEditing(c); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditing(null); };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">จัดการหมวดหมู่</h2>
        <button
          onClick={openAdd}
          className="text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          + เพิ่มหมวดหมู่
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">ID</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">ชื่อหมวดหมู่</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-8 text-center text-gray-400">
                  ไม่มีข้อมูลหมวดหมู่
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c.category_id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400 text-xs">{c.category_id}</td>
                  <td className="px-4 py-3 font-medium">{c.category_name}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openEdit(c)}
                      className="text-xs px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-100 mr-2 transition-colors"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(c.category_id)}
                      className="text-xs px-3 py-1.5 border border-red-200 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px]">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-medium">
                {editing ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <CategoryForm
              onSuccess={() => { fetchData(); closeModal(); }}
              editing={editing}
              setEditing={setEditing}
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default CategoryManager;