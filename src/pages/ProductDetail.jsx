import { useParams } from "react-router-dom";
import DatePicker from "../components/DatePicker";

function ProductDetail() {
  const { id } = useParams();

  return (
    <div>
      <h2>Product Detail #{id}</h2>

      <DatePicker />

      <button>เพิ่มลงตะกร้า</button>
    </div>
  );
}

export default ProductDetail;