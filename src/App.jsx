import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Products from "./pages/Products.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard.jsx";   // new overview page
import AdminProducts from "./pages/Adminproducts.jsx";     // renamed product manager
import AdminOrders from "./pages/Adminorder.jsx";
import AdminUsers from "./pages/Adminuser.jsx";

// import PrivateRoute from "./components/PrivateRoute.jsx";
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

        {/* Admin routes – all protected */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute adminOnly>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <PrivateRoute adminOnly>
              <AdminProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute adminOnly>
              <AdminOrders />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute adminOnly>
              <AdminUsers />
            </PrivateRoute>
          }
        />

        {/* Optional: redirect /admin to dashboard */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />
      </Routes>
    </>
  );
}