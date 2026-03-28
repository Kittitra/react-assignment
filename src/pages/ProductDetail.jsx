import { useParams } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import { useEffect, useState } from "react";
import { getProductById } from "../service/api";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  
  useEffect(() => {
    getProductById(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center gap-5">

      <div className="flex flex-row gap-3">
        <label>วันเริ่ม</label>
        <input type="date" onChange={(e) => setStart(e.target.value)} />

        <label>วันคืน</label>
        <input type="date" onChange={(e) => setEnd(e.target.value)} />
      </div>

      <h2>Product Detail</h2>
      <img src={product.img} alt="" className="w-50 h-50 rounded-md"/>
      <span>
        ชื่อสินค้า: {product.product_name}
      </span>
      <span>
        คำอธิบาย: {product.description}
      </span>
      <span>
        ค่าเช่าต่อวัน: {product.rental_price_per_day}
      </span>

      <button className="bg-purple-300 rounded-md p-3 hover:cursor-pointer">เช่า</button>
    </div>
  );
}

export default ProductDetail;