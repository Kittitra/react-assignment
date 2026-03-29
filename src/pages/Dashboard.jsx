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

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [productData, customerData, rentalData] = await Promise.all([
        getProducts(), getCustomers(), getRentals()
      ]);
      setProducts(productData);
      setCustomers(customerData);
      setRentals(rentalData);
      setRentedCount(rentalData.filter(r => !r.return_date).length);
      setTotalRevenue(rentalData.reduce((sum, r) => sum + (parseFloat(r.total_price) || 0), 0));
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-medium mb-6">Dashboard</h2>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {[
          { label: "สินค้าทั้งหมด",      value: products.length },
          { label: "ผู้ใช้ทั้งหมด",       value: customers.length },
          { label: "สินค้าที่ถูกเช่าอยู่", value: rentedCount },
          { label: "รายได้ทั้งหมด",       value: `${totalRevenue.toLocaleString()} ฿` },
        ].map((card) => (
          <div key={card.label} className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">{card.label}</p>
            <p className="text-2xl font-medium">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <h3 className="text-base font-medium mb-3">รายการเช่าทั้งหมด</h3>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">#</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Rental ID</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">ราคา</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((r, index) => (
              <tr key={r.rental_id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                <td className="px-4 py-3">Rental #{r.rental_id}</td>
                <td className="px-4 py-3">{parseFloat(r.total_price).toLocaleString()} บาท</td>
                <td className="px-4 py-3">
                  {!r.return_date
                    ? <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-md">กำลังเช่า</span>
                    : <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-md">คืนแล้ว</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;