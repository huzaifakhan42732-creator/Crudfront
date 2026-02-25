import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Products from "./pages/Products.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard.jsx";   // overview page
import AdminProducts from "./pages/Adminproducts.jsx";     // product manager
import AdminOrders from "./pages/Adminorder.jsx";
import AdminUsers from "./pages/Adminuser.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";  // removed
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes – temporarily unprotected */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />

        {/* Optional: redirect /admin to dashboard */}
      </Routes>
    </>
  );
}