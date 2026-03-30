import { useEffect, useState } from "react";
import { getCustomers, updateCustomerStatus } from "../services/customerService";

function UserManager() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers().then((data) => setCustomers(data)).catch(console.error);
  }, []);

  // ✅ toggle status
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateCustomerStatus(id, newStatus);
      setCustomers((prev) =>
        prev.map((c) =>
          c.customer_id === id ? { ...c, status: newStatus } : c
        )
      );
    } catch (err) {
      console.error(err);
      alert("เปลี่ยน status ไม่สำเร็จ");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">จัดการผู้ใช้</h2>
        <span className="text-sm text-gray-400">ทั้งหมด {customers.length} คน</span>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">ID</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">ชื่อ</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Email</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">เบอร์โทร</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">วันที่สมัคร</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
                  ไม่มีข้อมูลผู้ใช้
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.customer_id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400 text-xs">{c.customer_id}</td>
                  <td className="px-4 py-3 font-medium">{c.customer_name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.email}</td>
                  <td className="px-4 py-3 text-gray-500">{c.phone || "-"}</td>
                  <td className="px-4 py-3 text-gray-500">{c.register_date || "-"}</td>
                  <td className="px-4 py-3">
                    {/* ✅ กดได้เพื่อ toggle */}
                    <button
                      onClick={() => handleToggleStatus(c.customer_id, c.status)}
                      className={`text-xs px-3 py-1 rounded-md transition-colors ${
                        c.status === "active"
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-red-50 text-red-500 hover:bg-red-100"
                      }`}
                    >
                      {c.status}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManager;