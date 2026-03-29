import { useState } from "react";
import "./StyleLoginAndRegis.css";
import "./Toast.css";

export default function AllLoginAndRegis() {
  const [isActive, setIsActive] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showNotification = (msg, type) => {
    setToast({ show: true, message: msg, type: type });
    // หายไปเองหลังจาก 3 วินาที
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };
  
  // สร้าง State สำหรับเก็บข้อมูล Form
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "", // เพิ่มเพื่อให้ตรงกับ API Register
    phone: ""  // เพิ่มเพื่อให้ตรงกับ API Register
  });

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ฟังก์ชัน Register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/backend/api/customers.php/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.username,
          password: formData.password,
          email: formData.email || `${formData.username}@mail.com`, // ค่าสมมติถ้าไม่มี input
          phone: formData.phone || "0000000000"
        }),
      });
      const result = await response.json();
      if (result.success) {
        showNotification("สมัครสมาชิกสำเร็จ! กำลังพาท่านไปหน้าหลัก", "success");
        setTimeout(() => window.location.href = "/", 1000);
      } else {
        showNotification("อีเมลหรือรหัสผ่านซ้ำกัน โปรดตรวจสอบแล้วลองอีกครั้ง", "error");
      }
    } catch (error) {
      showNotification("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้", "error");
    }
  };

  // ฟังก์ชัน Login
  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost/backend/api/customers.php/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      }),
    });
    const result = await response.json();

    if (result.success) {
      // เก็บข้อมูลผู้ใช้ลง localStorage
      localStorage.setItem("user", JSON.stringify(result.user));
      showNotification("เข้าสู่ระบบสำเร็จ!", "success");
      setTimeout(() => window.location.href = "/", 1000);
    } else {
      showNotification("อีเมลหรือรหัสผ่านไม่ถูกต้อง", "error");
    }
  } catch (error) {
    showNotification("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้", "error");
  }
};

  return (
    <div className="container-body">
        {toast.show && (
            <div className="toast-container">
            <div className={`toast-box ${toast.type}`}>
                <div className="toast-icon">
                {toast.type === "success" ? "✓" : "!"}
                </div>
                <div className="toast-text">{toast.message}</div>
            </div>
            </div>
        )}
      <div className={`container ${isActive ? "active" : ""}`}>
        
        {/* REGISTER */}
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <span>Fill your details</span>
            <input name="username" type="text" placeholder="Username" onChange={handleChange} required />
            <input name="phone" type="text" placeholder="Phone" onChange={handleChange} required/>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* LOGIN */}
        <div className="form-container sign-in">
            <form onSubmit={handleLogin}>
                <h1>Sign In</h1>
                <span>Use your email for login</span>
                
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email Address" 
                    value={formData.email || ""} 
                    onChange={handleChange} 
                    required 
                />
                
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    value={formData.password || ""}
                    onChange={handleChange} 
                    required 
                />

                <button type="submit">Sign In</button>
            </form>
        </div>

        {/* TOGGLE PANEL */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <button className="ghost" onClick={() => setIsActive(false)}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <button className="ghost" onClick={() => setIsActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}