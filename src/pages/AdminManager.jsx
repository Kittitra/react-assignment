import { useEffect, useState } from "react";
import { updateAdmin, deleteAdmin, getAdmins } from "../services/adminService";
import AdminForm from "./AdminForm";

function AdminManager() {
  const [admins, setAdmins] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getAdmins();
      setAdmins(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setShowModal(true); };

  const handleDelete = async (id) => {
    if (!window.confirm("ยืนยันการลบ Admin?")) return;
    try {
      await deleteAdmin(id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (a) => { setEditing(a); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditing(null); };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">จัดการ Admin</h2>
        <button
          onClick={openAdd}
          className="text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          + เพิ่ม Admin
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">ID</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">ชื่อ</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Email</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Role</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Status</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
                  ไม่มีข้อมูล Admin
                </td>
              </tr>
            ) : (
              admins.map((a) => (
                <tr key={a.admin_id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400 text-xs">{a.admin_id}</td>
                  <td className="px-4 py-3 font-medium">{a.admin_name}</td>
                  <td className="px-4 py-3 text-gray-500">{a.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-3 py-1 rounded-md ${
                      a.role === "superadmin"
                        ? "bg-purple-50 text-purple-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {a.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-3 py-1 rounded-md ${
                      a.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-500"
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openEdit(a)}
                      className="text-xs px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-100 mr-2 transition-colors"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(a.admin_id)}
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
          <div className="bg-white rounded-2xl p-6 w-[480px]">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-medium">แก้ไข Admin</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>
            <AdminForm
              onSuccess={() => { fetchData(); closeModal(); }}
              editing={editing}
              setEditing={setEditing}
            />
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[480px]">
            <div className="flex justify-between items-center mb-5">
              {/* ✅ เปลี่ยนจาก hardcode เป็น dynamic */}
              <h3 className="text-lg font-medium">
                {editing ? "แก้ไข Admin" : "เพิ่ม Admin"}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>
            <AdminForm
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

export default AdminManager;