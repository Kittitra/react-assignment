// import ProductCard from "./ProductCard";

import ProductCard from "./ProductCart";

function ProductList({ products }) {
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ProductList;