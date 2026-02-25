import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { AuthContext } from "../context/Authcontext.jsx";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <-- new state
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
      />

      {/* Password Input with Show/Hide */}
      <div style={{ position: "relative", margin: "10px 0" }}>
        <input
          type={showPassword ? "text" : "password"} // toggle type
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ display: "block", padding: "8px 40px 8px 8px", width: "100%", boxSizing: "border-box" }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button onClick={submit} style={{ padding: "10px", width: "100%" }}>Login</button>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}