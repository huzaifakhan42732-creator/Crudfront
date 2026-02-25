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
    <>
      <div className="register-container">
        <h2>Create an account</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          placeholder="Full name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          placeholder="Email address"
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button onClick={submit}>Sign up</button>
      </div>

      <style>{`
        .register-container {
          max-width: 400px;
          margin: 40px auto;
          padding: 2rem;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08),
                      0 6px 12px rgba(0, 0, 0, 0.05);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

        .register-container h2 {
          margin: 0 0 1.5rem 0;
          font-size: 1.8rem;
          font-weight: 600;
          color: #1a1a1a;
          text-align: center;
          letter-spacing: -0.01em;
        }

        .register-container input {
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

        .register-container input:focus {
          outline: none;
          border-color: #007aff;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .register-container input::placeholder {
          color: #999;
          font-weight: 300;
        }

        .register-container button {
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

        .register-container button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 122, 255, 0.4);
        }

        .register-container button:active {
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
      `}</style>
    </>
  );
}