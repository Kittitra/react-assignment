import { useState } from "react";
// นำเข้าฟังก์ชันจาก service ที่อยู่ในโฟลเดอร์ใกล้ๆ กัน
import { login, register } from "../service/customerService"; 
import "./StyleLoginAndRegis.css";
import "./Toast.css";

export default function AllLoginAndRegis() {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: ""
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showNotification = (msg, type) => {
    setToast({ show: true, message: msg, type: type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // แก้ไขฟังก์ชัน Register ให้เรียกใช้ Service
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        customer_name: formData.username,
        password: formData.password,
        email: formData.email || `${formData.username}@mail.com`,
        phone: formData.phone || "0000000000"
      };

      const result = await register(dataToSubmit);

      if (result.success) {
          // สร้าง object ข้อมูลผู้ใช้จำลองขึ้นมาเอง เพื่อให้ Navbar มีชื่อไปโชว์
          const newUser = {
              customer_name: formData.username, // ใช้ username ที่กรอกในฟอร์ม
              email: formData.email
          };
          
          localStorage.setItem("user", JSON.stringify(newUser)); 
          showNotification("สมัครสมาชิกสำเร็จ!", "success");
          
          // ใช้คำสั่งนี้เพื่อให้หน้าเว็บโหลดใหม่และ Navbar ดึงค่าล่าสุดมาแสดง
          setTimeout(() => window.location.href = "/", 1000);
      }
    } catch (error) {
      showNotification("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้", "error");
    }
  };

  // แก้ไขฟังก์ชัน Login ให้เรียกใช้ Service
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      }); // เรียกใช้ login จาก service

      if (result.success) {
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
            <div className="toast-icon">{toast.type === "success" ? "✓" : "!"}</div>
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
            <input name="username" type="text" placeholder="Username" value={formData.username || ""} onChange={handleChange} required />
            <input name="phone" type="text" placeholder="Phone" value={formData.phone || ""} onChange={handleChange} required/>
            <input name="email" type="email" placeholder="Email" value={formData.email || ""} onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" value={formData.password || ""} onChange={handleChange} required />
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