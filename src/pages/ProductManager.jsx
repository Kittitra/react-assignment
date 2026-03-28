import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";

const API = "http://localhost/api/controllers/products.php";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${API}?id=${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h2>จัดการสินค้า</h2>

      <ProductForm
        onSuccess={fetchProducts}
        editing={editing}
        setEditing={setEditing}
      />

      <table border="1">
        <thead>
          <tr>
            <th>ชื่อสินค้า</th>
            <th>ราคา</th>
            <th>จัดการ</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.product_id}>
              <td>{p.product_name}</td>
              <td>{p.rental_price_per_day}</td>
              <td>
                <button onClick={() => setEditing(p)}>แก้ไข</button>
                <button onClick={() => handleDelete(p.product_id)}>
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManager;