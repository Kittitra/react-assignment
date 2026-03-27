import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Rental Shop</h2>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;