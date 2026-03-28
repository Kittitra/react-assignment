import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {

  return (
    <div className="w-fit flex flex-col gap-4 p-5 bg-gray-200 mt-10 rounded-xl">
      <img src={product.img} alt="" className="w-50 h-50 rounded-md"/>
      <h3>{product.product_name}</h3>
      <p>{product.rental_price_per_day} บาท/วัน</p>


      <Link to={`/product/${product.product_id}`}>
        <button className=" hover:cursor-pointer underline">ดูรายละเอียด</button>
      </Link>
    </div>
  );
}

export default ProductCard;