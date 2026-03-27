import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
// import { getProducts } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // getProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>สินค้าให้เช่า</h1>
      <ProductList products={products} />
    </div>
  );
}

export default Home;