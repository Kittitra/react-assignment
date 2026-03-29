import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Rental from "./pages/Rental";
import RentalManager from "./pages/RentalManager";
import Checkout from "./pages/CheckOut";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProductDetail from "./pages/product/ProductDetail";
import ProductManager from "./pages/product/ProductManager";

import CategoryForm from "./pages/category/CategoryForm";
import CategoryManager from "./pages/category/CategoryManager";

function App() {
  return (
    <BrowserRouter>
      <div style={styles.layout}>
        <Navbar />

        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* product */}
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/product-manager" element={<ProductManager />} />

            {/* rental */}
            <Route path="/rental" element={<Rental />} />
            <Route path="/rental/:id" element={<RentalManager />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* category */}
            <Route path="/category-manager" element={<CategoryManager />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
};

export default App;