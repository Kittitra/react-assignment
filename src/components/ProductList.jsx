// import ProductCard from "./ProductCard";

import ProductCard from "./ProductCart";

function ProductList({ products }) {
  return (
    <div className="flex flex-row gap-10">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ProductList;