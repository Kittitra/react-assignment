import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../services/productService";
import ProductForm from "./ProductForm";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // โหลดสินค้า
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ลบสินค้า
  const handleDelete = async (id) => {
    if (window.confirm("ลบสินค้านี้?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  // เปิด modal
  const openAdd = () => {
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
  };

  return (
    <div>
      <h2>Product Manager</h2>

      <button onClick={openAdd}>+ เพิ่มสินค้า</button>

      <hr />

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>ชื่อสินค้า</th>
            <th>ราคา/วัน</th>
            <th>Category</th>
            <th>จัดการ</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5">ไม่มีข้อมูล</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.product_id}>
                <td>{p.product_id}</td>
                <td>{p.product_name}</td>
                <td>{p.rental_price_per_day}</td>
                <td>{p.category_name || "-"}</td>
                <td>
                  <button onClick={() => openEdit(p)}>แก้ไข</button>
                  <button onClick={() => handleDelete(p.product_id)}>ลบ</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <ProductForm
              onSuccess={() => {
                fetchProducts();
                closeModal();
              }}
              editing={editing}
              setEditing={setEditing}
            />

            <button onClick={closeModal}>ปิด</button>
          </div>
        </div>
      )}
    </div>
  );
}

//
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "320px"
};

export default ProductManager;