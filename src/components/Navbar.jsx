import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full flex flex-row gap-10 p-10 bg-gray-300">
      <h2 className="w-1/5">Rental Shop</h2>
      <div className="w-full flex flex-row gap-10 justify-end">
        
      <Link to="/">Home</Link>
      <Link to="/rental">Rental</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/category-form">CategoryForm</Link>
      <Link to="/category-manager">CategoryManager</Link>
      <Link to="/product-form">ProductForm</Link>
      <Link to="/product-manager">ProductManager</Link>
      <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;