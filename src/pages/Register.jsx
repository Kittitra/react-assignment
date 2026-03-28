import { useState } from "react";
import { Link } from "react-router-dom";
import "./StyleLoginAndRegis.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Register:", form);
    alert("สมัครสมาชิกสำเร็จ");
  };

  return (
    <div className="container">
      <div className="form-container sign-up" style={{ width: "100%", opacity: 1 }}>
        <form>
          <h1>Create Account</h1>

          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>

          <span>or use your email for registration</span>

          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button type="submit">Sign Up</button>

          <p>
            Already have an account?{" "}
            <Link to="/">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;