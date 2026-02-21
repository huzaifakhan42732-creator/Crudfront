import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { AuthContext } from "../context/Authcontext.jsx";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!data.name || !data.email || !data.password) {
      setError("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      setError("Invalid email format");
      return false;
    }
    if (data.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const submit = async () => {
    setError("");
    if (!validateForm()) return;

    try {
      const res = await API.post("/auth/register", data);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Name"
        value={data.name}
        onChange={e => setData({ ...data, name: e.target.value })}
        style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
      />
      <input
        placeholder="Email"
        value={data.email}
        onChange={e => setData({ ...data, email: e.target.value })}
        style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
      />
      <input
        placeholder="Password"
        type="password"
        value={data.password}
        onChange={e => setData({ ...data, password: e.target.value })}
        style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
      />
      <button onClick={submit} style={{ padding: "10px", width: "100%" }}>Register</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}
