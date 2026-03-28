import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./StyleLoginAndRegis.css";

function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // mock login
    const userData = { email };
    login(userData);

    alert("Login สำเร็จ");
  };

   return (
    <div className="container">
      <div className="form-container sign-in" style={{ width: "100%" }}>
        <form>
          <h1>Sign In</h1>

          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>

          <span>or use your email password</span>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <a href="#">Forget Your Password?</a>

          <button type="submit">Sign In</button>

          <p>
            Don't have an account?{" "}
            <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;