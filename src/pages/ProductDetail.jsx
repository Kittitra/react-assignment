import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getProductById } from "../services/productService";
import { getProductItems } from "../services/productItemService";
import { createRental } from "../services/rentalService";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [productItem, setProductItem] = useState([]);
  const [rentData, setRentData] = useState({});
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    getProductItems().then((data) => setProductItem(data));
  }, []);

  useEffect(() => {
    getProductById(id).then((data) => setProduct(data));
  }, [id]);

  const result = useMemo(() => {
    return productItem.filter(
      (item) => item.product_id === Number(id) && item.status === "available"
    );
  }, [productItem, id]);

  const diffDays = start && end
    ? (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
    : 0;

  const Rental = () => {
    // Validation
    if (!start || !end) {
      alert("กรุณาเลือกวันเริ่มและวันคืน");
      return;
    }

    if (new Date(end) <= new Date(start)) {
      alert("วันคืนต้องมากกว่าวันเริ่ม");
      return;
    }

    if (result.length === 0) {
      alert("ไม่มีสินค้าว่างในขณะนี้");
      return;
    }

    const data = {
      customer_id: 1,
      admin_id: 1,
      rental_date: start,
      due_date: end,
      items: [
        {
          item_id: result[0]?.item_id,
          price_per_day: product.rental_price_per_day,
          days: diffDays,
        },
      ],
    };

    setRentData(data);
    createRental(data);
    alert("เช่าเสร็จสิ้น.");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-row gap-3">
        <label>วันเริ่ม</label>
        <input type="date" onChange={(e) => setStart(e.target.value)} />
        <label>วันคืน</label>
        <input type="date" onChange={(e) => setEnd(e.target.value)} />
      </div>

      <h2>Product Detail</h2>
      <img src={product.image_url} alt="" className="w-50 h-50 rounded-md" />
      <span>ชื่อสินค้า: {product.product_name}</span>
      <span>คำอธิบาย: {product.description}</span>
      <span>ค่าเช่าต่อวัน: {product.rental_price_per_day}</span>
      <span>จำนวนที่เหลือ: {result.length}</span>

      <button
        className="bg-purple-300 rounded-md p-3 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={Rental}
        disabled={!start || !end || result.length === 0}
      >
        เช่า
      </button>
    </div>
  );
}

export default ProductDetail;