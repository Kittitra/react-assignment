import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { getCustomers } from "../services/customerService";
import { getRentals } from "../services/rentalService";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [rentals, setRentals] = useState([]);

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [rentedCount, setRentedCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productData = await getProducts();
      const customerData = await getCustomers();
      const rentalData = await getRentals();

      setProducts(productData);
      setCustomers(customerData);
      setRentals(rentalData);

      // นับสินค้าที่กำลังถูกเช่า
      const rented = rentalData.filter(r => !r.return_date);
      setRentedCount(rented.length);

      // รวมรายได้
      const revenue = rentalData.reduce((sum, r) => {
        return sum + (parseFloat(r.total_price) || 0);
      }, 0);
      setTotalRevenue(revenue);

    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <p>สินค้าทั้งหมด: {products.length}</p>
      <p>ผู้ใช้ทั้งหมด: {customers.length}</p>
      <p>สินค้าที่ถูกเช่าอยู่: {rentedCount}</p>
      <p>รายได้ทั้งหมด: {totalRevenue} บาท</p>

      <hr />

      <h3>รายการเช่าทั้งหมด</h3>

      <ul>
        {rentals.map((r) => (
          <li key={r.rental_id}>
            Rental #{r.rental_id} - {r.total_price} บาท
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;