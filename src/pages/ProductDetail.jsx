import { useParams } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import { useEffect, useState } from "react";
import { getProductById } from "../service/api";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  
  useEffect(() => {
    getProductById(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

  return (
    <div className="flex flex-col ">
      <h2>Product Detail</h2>
      <span>
        {product.product_name}
      </span>
      <span>
        {product.description}
      </span>
      <DatePicker />

      <button>เพิ่มลงตะกร้า</button>
    </div>
  );
}

export default ProductDetail;