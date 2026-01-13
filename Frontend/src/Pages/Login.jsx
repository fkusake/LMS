import image from "../assets/illustration.jpg";
import Styles from "../Styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserContext } from "../context/UserContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, valid } = getUserContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result) {
      navigate("/");
    } else {
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div
      className="container-fluid bg-light px-0"
      style={{ height: "calc(100vh - 56px)" }}
    >
      <div className="row h-100 w-100 g-0">
        {/* LEFT SIDE – Illustration (Desktop only) */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-primary h-100">
          <img
            src={image}
            alt="Login Illustration"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* RIGHT SIDE – Login Form */}
        <div
          className={`col-12 col-md-6 d-flex align-items-center justify-content-center h-100 ${Styles.logindiv}`}
        >
          <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-4">Welcome Back</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-decoration-none">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100">
                Login
              </button>
            </form>

            <p className="text-center mt-4 mb-0">
              Don’t have an account?{" "}
              <Link to="/register" className="fw-semibold text-decoration-none">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
