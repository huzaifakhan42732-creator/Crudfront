import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { AuthContext } from "../context/Authcontext.jsx";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <>
      <div className="login-container">
        <h2>Welcome back</h2>
        {error && <p className="error-message">{error}</p>}

        <input
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button onClick={submit} className="login-button">
          Sign in
        </button>

        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>

      <style>{`
        body {
          margin: 0;
          background-color: #f5f5f7; /* soft page background */
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .login-container {
          max-width: 400px;
          margin: 40px auto;
          padding: 2rem;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08),
                      0 6px 12px rgba(0, 0, 0, 0.05);
          animation: fadeSlideUp 0.5s ease-out;
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-container h2 {
          margin: 0 0 1.5rem 0;
          font-size: 1.8rem;
          font-weight: 600;
          color: #1a1a1a;
          text-align: center;
          letter-spacing: -0.01em;
        }

        .login-container input {
          display: block;
          width: 100%;
          padding: 0.9rem 1.2rem;
          margin: 0.8rem 0;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.2s ease;
          background: #fafafa;
          box-sizing: border-box;
        }

        .login-container input:focus {
          outline: none;
          border-color: #007aff;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .login-container input::placeholder {
          color: #999;
          font-weight: 300;
        }

        /* Password wrapper for toggle button */
        .password-wrapper {
          position: relative;
          margin: 0.8rem 0;
        }

        .password-wrapper input {
          margin: 0;
          padding-right: 70px; /* space for toggle button */
        }

        .toggle-password {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #007aff;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0.5rem;
          transition: color 0.2s ease;
        }

        .toggle-password:hover {
          color: #0051d5;
        }

        .login-button {
          width: 100%;
          padding: 0.9rem;
          margin-top: 1.2rem;
          background: linear-gradient(135deg, #007aff, #0051d5);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
          box-shadow: 0 8px 20px rgba(0, 122, 255, 0.3);
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 122, 255, 0.4);
        }

        .login-button:active {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }

        .error-message {
          margin: 0 0 1rem 0;
          padding: 0.8rem 1rem;
          background: #ffeeee;
          color: #d32f2f;
          border-radius: 10px;
          font-size: 0.95rem;
          text-align: center;
          border-left: 4px solid #d32f2f;
          animation: shake 0.4s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }

        .register-link {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.95rem;
          color: #666;
        }

        .register-link a {
          color: #007aff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .register-link a:hover {
          color: #0051d5;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}