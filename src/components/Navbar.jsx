import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full flex flex-row gap-10 p-10 bg-gray-300">
      <h2 className="w-1/5">Rental Shop</h2>
      <div className="w-full flex flex-row gap-10 justify-end">
        
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;