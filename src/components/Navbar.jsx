import { useState, useEffect } from "react";
import "./Navbar.css"; // อย่าลืมสร้างไฟล์ CSS เพื่อแต่ง Dropdown

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    
    // แก้ไข: เช็คว่า savedUser ต้องมีค่า และไม่เป็นคำว่า "undefined" (string)
    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user"); // ถ้าข้อมูลเสียให้ลบทิ้งเลย
      }
    }
  }, []);

  const handleLogout = () => {
    // ลบข้อมูล user ออกจากเครื่อง Browser
    localStorage.removeItem("user");
    // พาผู้ใช้กลับไปหน้า Login หรือ Home
    window.location.href = "/allLoginAndRegis"; 
  };

  return (
    <nav className="navbar">
      {/* 1. ฝั่งซ้ายสุด: Logo คลิกเพื่อกลับหน้าหลัก */}
      <div className="logo" onClick={() => window.location.href = "/"} style={{ cursor: "pointer" }}>
        Shop Now!
      </div>

      {/* 2. ตรงกลาง: เมนูหลัก */}
      <div className="nav-links-center">
        <a href="/">Services</a>
        <a href="/">Projects</a>
        <a href="/">About</a>
      </div>

      {/* 3. ฝั่งขวาสุด: ส่วนของผู้ใช้ */}
      <div className="nav-user-right">
        {user ? (
          <div className="user-menu" onClick={() => setShowDropdown(!showDropdown)}>
            {/* ตรวจสอบว่าในข้อมูล user มี customer_name หรือไม่ */}
            <span className="user-name">
              {user.customer_name || user.username || "User"} ▼
            </span>
            {showDropdown && (
              <div className="dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="contact-btn" onClick={() => window.location.href = "/allLoginAndRegis"}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}