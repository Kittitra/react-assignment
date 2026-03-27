import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt="" />
      <h3>{product.name}</h3>
      <p>{product.price} บาท/วัน</p>

      <Link to={`/product/${product.id}`}>
        <button>ดูรายละเอียด</button>
      </Link>
    </div>
  );
}

export default ProductCard;