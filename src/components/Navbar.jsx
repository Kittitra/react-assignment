import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
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
    window.location.href = "/login"; 
  };

  const userData = JSON.parse(localStorage.getItem("user"));

  console.log("User Data in Navbar:", userData); // ตรวจสอบข้อมูลที่ได้จาก localStorage

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => window.location.href = "/"} style={{ cursor: "pointer" }}>
        Rental Shop
      </div>

      
       {userData?.role === "admin" && (
          <div className="nav-links-center">
            <Link to="/">Home</Link>
            <Link to="/rental">Rental</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/category-form">CategoryForm</Link>
            <Link to="/category-manager">CategoryManager</Link>
            <Link to="/product-form">ProductForm</Link>
            <Link to="/product-manager">ProductManager</Link>
            <Link to="/addadmin">AddAdmin</Link>
          </div>
        )}

        {userData?.role == "user" && (
          <div className="nav-links-center">
            <Link to="/onrenting">On Renting</Link>
            <Link to="/history-rental">History Rental</Link>
          </div>
        )}
        

       <div className="nav-user-right">
        {user ? (
          <div className="user-menu" onClick={() => setShowDropdown(!showDropdown)}>
            {/* ตรวจสอบว่าในข้อมูล user มี customer_name หรือไม่ */}
            <span className="user-name">
              {user.customer_name || user.admin_name || "User"} ▼
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

export default Navbar;