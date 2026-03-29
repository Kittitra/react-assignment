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
import RentalManager from "./pages/RentalManager";
import AllLoginAndRegis from "./pages/AllLoginAndRegis";
import OnRenting from "./pages/OnRenting";
import HistoryRental from "./pages/HistoryRental";
import AddAdmin from "./pages/AddAdmin";

function App() {
  return (
    <BrowserRouter>
      <div style={styles.layout}>
        
        {/* Header */}
        <Navbar />

        {/* Main Content */}
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute adminOnly>
                <Home />
              </ProtectedRoute>
              } />
            <Route path="/product/:id" element={
              <ProtectedRoute adminOnly>
                <ProductDetail />
              </ProtectedRoute>
            } />
            <Route path="/rental" element={
              <ProtectedRoute adminOnly>
                <Rental />
              </ProtectedRoute>
            } />
            <Route path="/rental/:id" element={
              <ProtectedRoute adminOnly>
                <RentalManager />
              </ProtectedRoute>
              } />
            <Route path="/checkout" element={
              <ProtectedRoute adminOnly>
                <Checkout />
              </ProtectedRoute>
            } />

            <Route path="/login" element={

              <AllLoginAndRegis />
          } />
            {/* <Route path="/register" element={<Register />} /> */}

            <Route path="/onrenting" element={
              <ProtectedRoute >
                <OnRenting />
              </ProtectedRoute>
            } />

            <Route path="/history-rental" element={
              <ProtectedRoute >
                <HistoryRental />
              </ProtectedRoute>
            } />



            <Route path="/dashboard" element={
              <ProtectedRoute adminOnly>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/category-form" element={
              <ProtectedRoute adminOnly>
                <CategoryForm />
              </ProtectedRoute>
            } />
            <Route path="/category-manager" element={
              <ProtectedRoute adminOnly>
                <CategoryManager />
              </ProtectedRoute>
            } />
            <Route path="/product-form" element={
              <ProtectedRoute adminOnly>
                <ProductForm />
              </ProtectedRoute>
            } />
            <Route path="/product-manager" element={
              <ProtectedRoute adminOnly>
                <ProductManager />
              </ProtectedRoute>
            } />
            <Route path="/addadmin" element={
              <ProtectedRoute adminOnly>
                <AddAdmin />
              </ProtectedRoute>
            } />

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