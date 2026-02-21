import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Authcontext.jsx";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Products</Link>

      {user?.isAdmin && (
        <Link to="/admin">Admin</Link>
      )}

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
