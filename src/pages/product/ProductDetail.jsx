import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getProductById } from "../../services/productService";
import { getProductItems } from "../../services/productItemService";
import { createRental } from "../../services/rentalService";
import { getCustomerByEmail } from "../../services/customerService"; // ✅ เพิ่ม

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [productItem, setProductItem] = useState([]);
  const [rentData, setRentData] = useState({});
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [customerEmail, setCustomerEmail] = useState(""); // ✅ เพิ่ม
  const [customerId, setCustomerId] = useState(null);     // ✅ เพิ่ม
  const [emailError, setEmailError] = useState("");       // ✅ เพิ่ม

  useEffect(() => {
    getProductItems().then((data) => setProductItem(data));
  }, []);

  useEffect(() => {
    getProductById(id).then((data) => setProduct(data));
  }, [id]);

  const availableItems = useMemo(() => {
    return productItem.filter(
        (item) => item.product_id === Number(id) && item.status === "available"
    );
    }, [productItem, id]);

  const diffDays = start && end
    ? (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
    : 0;

  const userData = JSON.parse(localStorage.getItem("user"));

  // ✅ ค้นหา customer จาก email
  const handleEmailLookup = async () => {
    if (!customerEmail) return;
    try {
      const result = await getCustomerByEmail(customerEmail);

      console.log("Customer Lookup Result:", result); // ตรวจสอบผลลัพธ์จาก API
      
      // ✅ แก้จาก result?.customer_id เป็น result?.customer?.customer_id
      if (result?.customer?.customer_id) {
        setCustomerId(result.customer.customer_id);
        setEmailError("");
      } else {
        setCustomerId(null);
        setEmailError("ไม่พบ email นี้ในระบบ");
      }
    } catch {
      setCustomerId(null);
      setEmailError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  const Rental = () => {
    if (!start || !end) { alert("กรุณาเลือกวันเริ่มและวันคืน"); return; }
    if (new Date(end) <= new Date(start)) { alert("วันคืนต้องมากกว่าวันเริ่ม"); return; }
    if (!customerId) { alert("กรุณากรอก email และตรวจสอบให้พบ customer ก่อน"); return; }

    // ✅ เช็คก่อนว่ามีของว่างไหม
    if (availableItems.length === 0) {
        alert("ไม่มีสินค้าว่างในขณะนี้");
        return;
    }

    const data = {
        customer_id: customerId,
        admin_id: userData?.role === "admin" ? userData.admin_id : null,
        rental_date: start,
        due_date: end,
        items: [
        {
            item_id: availableItems[0].item_id, // ✅ ไม่ใช้ ?. เพราะเช็คแล้วว่าไม่ว่าง
            price_per_day: product.rental_price_per_day,
            days: diffDays,
        },
        ],
    };

    setRentData(data);
    createRental(data);
    alert("เช่าเสร็จสิ้น.");
    };

  return (
    <div className="flex flex-col justify-center items-center gap-5">

      {/* ✅ ส่วนกรอก email หา customer */}
      <div className="flex flex-row gap-3 items-center">
        <label>Email ลูกค้า</label>
        <input
          type="email"
          placeholder="กรอก email ลูกค้า"
          value={customerEmail}
          onChange={(e) => {
            setCustomerEmail(e.target.value);
            setCustomerId(null); // reset ถ้าแก้ email ใหม่
          }}
          className="border rounded p-1"
        />
        <button
          onClick={handleEmailLookup}
          className="bg-blue-300 rounded px-3 py-1 hover:cursor-pointer"
        >
          ค้นหา
        </button>
      </div>

      {/* ✅ แสดงผลการค้นหา */}
      {customerId && (
        <span className="text-green-600">✓ พบลูกค้า (ID: {customerId})</span>
      )}
      {emailError && (
        <span className="text-red-500">{emailError}</span>
      )}

      <div className="flex flex-row gap-3">
        <label>วันเริ่มเช่า</label>
        <input type="date" onChange={(e) => setStart(e.target.value)} />
        <label>วันคืน</label>
        <input type="date" onChange={(e) => setEnd(e.target.value)} />
      </div>

      <h2>Product Detail</h2>
      <img src={product.image_url} alt="" className="w-50 h-50 rounded-md" />
      <span>ชื่อสินค้า: {product.product_name}</span>
      <span>คำอธิบาย: {product.description}</span>
      <span>ค่าเช่าต่อวัน: {product.rental_price_per_day}</span>
      <span>จำนวนชิ้น: {availableItems.length}</span>

      <button
        className="bg-purple-300 rounded-md p-3 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={Rental}
        disabled={!start || !end || !customerId || availableItems.length === 0}
      >
        {availableItems.length === 0 ? "สินค้าหมด" : "เช่า"}
      </button>
    </div>
  );
}

export default ProductDetail;