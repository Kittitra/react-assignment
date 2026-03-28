import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Rental";
import Checkout from "./pages/CheckOut";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./protect/ProtectRoute";
import Footer from "./components/Footer";
import CategoryForm from "./pages/CategoryForm";
import CategoryManager from "./pages/CategoryManager";
import ProductForm from "./pages/ProductForm";
import ProductManager from "./pages/ProductManager";
import Rental from "./pages/Rental";

function App() {
  return (
    <BrowserRouter>
      <div style={styles.layout}>
        
        {/* Header */}
        <Navbar />

        {/* Main Content */}
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/rental" element={<Rental />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/category-form" element={<CategoryForm />} />
            <Route path="/category-manager" element={<CategoryManager />} />
            <Route path="/product-form" element={<ProductForm />} />
            <Route path="/product-manager" element={<ProductManager />} />

            {/* Protected */}
            {/* <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </div>

        {/* Footer */}
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