import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../services/productService";
import ProductForm from "./ProductForm";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("ลบสินค้านี้?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const openAdd = () => { setEditing(null); setShowModal(true); };
  const openEdit = (p) => { setEditing(p); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditing(null); };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">Product Manager</h2>
        <button
          onClick={openAdd}
          className="text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          + เพิ่มสินค้า
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">ID</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">ชื่อสินค้า</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">ราคา / วัน</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">หมวดหมู่</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-400">
                  ไม่มีข้อมูลสินค้า
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.product_id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400 text-xs">{p.product_id}</td>
                  <td className="px-4 py-3 font-medium">{p.product_name}</td>
                  <td className="px-4 py-3">{Number(p.rental_price_per_day).toLocaleString()} ฿</td>
                  <td className="px-4 py-3">
                    {p.category_name
                      ? <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-md">{p.category_name}</span>
                      : <span className="text-gray-400">-</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openEdit(p)}
                      className="text-xs px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-100 mr-2 transition-colors"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(p.product_id)}
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
          <div className="bg-white rounded-2xl p-6 w-[520px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {editing ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <ProductForm
              onSuccess={() => { fetchProducts(); closeModal(); }}
              editing={editing}
              setEditing={setEditing}
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductManager;