import { useState } from "react";
// --- จุดที่ต้องมี: เพิ่มการนำเข้าฟังก์ชัน login และ register ---
import { login, register } from "../services/customerService"; 
import "./StyleLoginAndRegis.css";
import "./Toast.css";
import { loginAdmin } from "../services/adminService";

export default function AllLoginAndRegis() {
  const [isActive, setIsActive] = useState(false);
  
  // --- จุดที่ต้องแก้: เพิ่ม isAdmin เข้าไปใน State ---
  const [isAdmin, setIsAdmin] = useState(false); 
  
  const [isReset, setIsReset] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showNotification = (msg, type) => {
    setToast({ show: true, message: msg, type: type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };
  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "", 
    phone: ""  
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        const fullUserData = {
          customer_id: result.customer_id || result.user?.customer_id || "Unknown ID", 
          customer_name: formData.username,
          password: "********",
          email: dataToSubmit.email,
          phone: dataToSubmit.phone,
          register_date: new Date().toISOString().split('T')[0],
          status: "active"
        };
        
        localStorage.setItem("user", JSON.stringify({ ...fullUserData, role: "user" })); 
        console.log("Register Success! User Data Array:", [fullUserData]);
        showNotification("สมัครสมาชิกสำเร็จ!", "success");
        setTimeout(() => window.location.href = "/", 1000);
      }
    } catch (error) {
      showNotification("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้", "error");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        if (isAdmin) {
            const result = await loginAdmin(formData.email, formData.password);

            if (result.success) {
              // ❌ เดิม: result.user  → ไม่มี field นี้
              // ✅ แก้เป็น: result.admin → ตรงกับที่ PHP ส่งมา
              localStorage.setItem("user", JSON.stringify({ ...result.admin, role: "admin" }));
              showNotification("เข้าสู่ระบบสำเร็จ!", "success");
              setTimeout(() => window.location.href = "/", 1000);
            } else {
              showNotification("อีเมลหรือรหัสผ่านไม่ถูกต้อง", "error");
            }
        } else {
        // ✅ User ใช้ login method เดิม
        const result = await login({
          email: formData.email,
          password: formData.password
        });

        if (result.success) {
          localStorage.setItem("user", JSON.stringify({ ...result.user, role: "user" }));
          showNotification("เข้าสู่ระบบสำเร็จ!", "success");
          setTimeout(() => window.location.href = "/", 1000);
        } else {
          showNotification("อีเมลหรือรหัสผ่านไม่ถูกต้อง", "error");
        }
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

      {/* ใช้งาน isAdmin ได้แล้วเพราะประกาศ State ไว้ข้างบนแล้ว */}
      <div className={`container ${isActive ? "active" : ""} ${isAdmin ? "admin-mode" : ""}`}>
        
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <span>Use your email for registration</span>
            <input name="username" type="text" placeholder="Name" required onChange={handleChange} />
            <input name="phone" type="text" placeholder="Phone" required onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            {!isActive && (
              <div className="role-switch-container">
                <span 
                  className={`role-tab ${!isAdmin ? "active-user" : ""}`} 
                  onClick={() => setIsAdmin(false)}
                >
                  User
                </span>
                <span className="divider">|</span>
                <span 
                  className={`role-tab ${isAdmin ? "active-admin" : ""}`} 
                  onClick={() => {
                    setIsAdmin(true);
                    setIsActive(false); 
                  }}
                >
                  Admin
                </span>
              </div>
            )}

            <h1>{isAdmin ? "Admin Sign In" : "Sign In"}</h1>
            <span>{isAdmin ? "Access for administrator only" : "Use your email for login"}</span>
            <input name="email" type="email" placeholder="Email Address" required onChange={handleChange}/>
            <input name="password" type="password" placeholder="Password" required onChange={handleChange}/>
            <button type="submit" className={isAdmin ? "btn-admin" : ""}>
              {isAdmin ? "Admin Login" : "Sign In"}
            </button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>{isAdmin ? "Admin Portal" : "Welcome Back!"}</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="ghost" onClick={() => setIsActive(false)}>Sign In</button>
            </div>
            
            <div className="toggle-panel toggle-right">
              {!isAdmin ? (
                <>
                  <h1>Hello, Friend!</h1>
                  <p>Register with your personal details...</p>
                  <button className="ghost" onClick={() => setIsActive(true)}>Sign Up</button>
                </>
              ) : (
                <>
                  <h1>System Admin</h1>
                  <p>Security is our top priority. Please log in with your admin credentials.</p>
                  {/* ซ่อนปุ่ม Sign Up สำหรับ Admin เพราะปกติ Admin สมัครเองไม่ได้ */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}