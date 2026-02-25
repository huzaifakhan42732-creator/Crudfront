
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Authcontext.jsx";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex gap-8 items-center">
          <Link 
            to="/" 
            className="nav-link text-lg font-semibold relative group"
          >
            Products
          </Link>
          {user?.isAdmin && (
            <div className="flex gap-8 items-center">
              <Link 
                to="/admin/dashboard" 
                className="nav-link relative group"
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/products" 
                className="nav-link relative group"
              >
                Manage Products
              </Link>
              <Link 
                to="/admin/orders" 
                className="nav-link relative group"
              >
                Orders
              </Link>
              <Link 
                to="/admin/users" 
                className="nav-link relative group"
              >
                Users
              </Link>
            </div>
          )}
        </div>
        <div>
          {user ? (
            <button 
              onClick={logout} 
              className="btn-logout relative overflow-hidden px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
            >
              <span className="relative z-10">Logout</span>
            </button>
          ) : (
            <div className="flex gap-6 items-center">
              <Link 
                to="/login" 
                className="nav-link relative group"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn-register relative overflow-hidden px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
              >
                <span className="relative z-10">Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}