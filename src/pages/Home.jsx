import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { getProducts } from "../services/productService";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);

      console.log("API RESULT:", data); // ✅ ถูก
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl py-5">สินค้าให้เช่า</h1>
      <ProductList products={products} />
    </div>
  );
}

export default Home;