import { useEffect, useMemo, useState } from "react";
import { getRentals } from "../../services/rentalService";
import { getRentalItems } from "../../services/rentalItem";
import { getProducts } from "../../services/productService";
import { Link } from "react-router-dom";

function Rental() {
  const [rent, setRent] = useState([]);
  const [rentItem, setRentItem] = useState([]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    getRentals().then((res) => setRent(res));
  } ,[])

  useEffect(() => {
    getRentalItems().then((res) => setRentItem(res));
  }, [])

  console.log(products)

  // const result = useMemo(() => {
  //   return rentItem.filter(
  //     (item) => item.product_id === rent && item.status === "available"
  //   );
  // }, [rentItem, id]);

  return (
    <div>
      <h2 className="text-3xl py-5">สินค้าที่ถูกจอง</h2>

      <div className="flex flex-row gap-5 p-5 ">
        {products.map((items, index) => (
          <div key={index} className="flex flex-col gap-3 rounded-xl  bg-gray-300 p-5">
            <img src={items.image_url} alt="" className="w-50 h-50 object-cover rounded-md" />
            <span className="font-bold text-xl">{items.product_name}</span>
            <span>{items.category_name}</span>

            <Link to={`/rental/${items.product_id}`}>
              <button className=" hover:cursor-pointer underline">รายการจองของ {items.product_name}</button>
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Rental;