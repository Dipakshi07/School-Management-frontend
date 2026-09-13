import { useState } from "react";
import {
  GraduationCap,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import "./Login.css";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // =========================================
  // HANDLE INPUT CHANGE
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  // =========================================
  // HANDLE ADMIN LOGIN
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Clear old login data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // =====================================
      // ADMIN LOGIN API
      // =====================================

      const response = await fetch(
        "https://school-management-backend-jcoe.onrender.com/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            role: "admin",
          }),
        }
      );

      const data = await response.json();

      console.log("ADMIN LOGIN RESPONSE:", data);

      // =====================================
      // BACKEND ERROR
      // =====================================

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid admin email or password"
        );
      }

      // =====================================
      // CHECK TOKEN
      // =====================================

      if (!data.token) {
        throw new Error(
          "Login successful but authentication token was not received."
        );
      }

      // =====================================
      // CHECK USER
      // =====================================

      if (!data.user) {
        throw new Error(
          "Login successful but admin information was not received."
        );
      }

      // =====================================
      // ADMIN ROLE CHECK
      // =====================================

      if (data.user.role !== "admin") {
        throw new Error(
          "Access denied. Only administrator can login."
        );
      }

      // =====================================
      // SAVE TOKEN
      // =====================================

      localStorage.setItem("token", data.token);

      // =====================================
      // SAVE ADMIN USER
      // =====================================

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      console.log("Admin Logged In:", data.user);

      // =====================================
      // SUCCESS
      // =====================================

      setSuccessMessage(
        "Admin login successful! Redirecting..."
      );

      // =====================================
      // ADMIN DASHBOARD ONLY
      // =====================================

      setTimeout(() => {
        navigate("/admin-dashboard", {
          replace: true,
        });
      }, 500);
    } catch (error) {
      console.error("Admin Login Error:", error);

      setErrorMessage(
        error.message ||
          "Something went wrong. Please try again."
      );

      // Remove invalid login data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* =====================================
          LEFT SIDE
      ====================================== */}

      <div className="login-visual">

        <div className="login-visual-content">

          <Link
            to="/"
            className="login-logo"
          >
            <div>
              <GraduationCap size={32} />
            </div>

            <span>
              Bright Future
            </span>
          </Link>

          <h1>
            Welcome Back
          </h1>

          <p>
            Access the school administration
            portal and manage everything from
            one secure dashboard.
          </p>

        </div>

      </div>

      {/* =====================================
          LOGIN FORM SECTION
      ====================================== */}

      <div className="login-form-section">

        <div className="login-form-container">

          {/* Mobile Logo */}

          <Link
            to="/"
            className="mobile-login-logo"
          >
            🎓 Bright Future
          </Link>

          {/* Heading */}

          <div className="login-heading">

            <span>
              ADMINISTRATION PORTAL
            </span>

            <h2>
              Admin Sign In
            </h2>

            <p>
              Enter your administrator credentials
              to continue.
            </p>

          </div>

          {/* =================================
              LOGIN FORM
          ================================= */}

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            {/* =================================
                EMAIL
            ================================= */}

            <div className="form-group">

              <label>
                Admin Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
              />

            </div>

            {/* =================================
                PASSWORD
            ================================= */}

            <div className="form-group">

              <label>
                Password
              </label>

              <div className="password-input">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}

                </button>

              </div>

            </div>

            {/* =================================
                REMEMBER + FORGOT PASSWORD
            ================================= */}

            <div className="login-options">

              <label>

                <input
                  type="checkbox"
                />

                Remember me

              </label>

              <Link to="#">
                Forgot Password?
              </Link>

            </div>

            {/* =================================
                SUCCESS MESSAGE
            ================================= */}

            {successMessage && (
              <div className="login-success">
                {successMessage}
              </div>
            )}

            {/* =================================
                ERROR MESSAGE
            ================================= */}

            {errorMessage && (
              <div className="login-error">
                {errorMessage}
              </div>
            )}

            {/* =================================
                SUBMIT BUTTON
            ================================= */}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >

              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Admin Sign In
                  <ArrowRight size={18} />
                </>
              )}

            </button>

          </form>

          {/* =================================
              BACK HOME
          ================================= */}

          <div className="back-home">

            <Link to="/">
              ← Back to School Website
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;