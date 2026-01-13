import image from "../assets/illustration.jpg";
import Styles from "../Styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log("in");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        {
          name:formData.name,
          email:formData.email,
          password:formData.password,
          role:formData.role
        }
      );
      toast.success("Registered successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.result || "Server error");
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
            alt="Register Illustration"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* RIGHT SIDE – Register Form */}
        <div
          className={`col-12 col-md-6 d-flex align-items-center justify-content-center h-100 ${Styles.logindiv}`}
        >
          <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-4">Create Account</h3>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
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

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Create password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Instructor code</label>

                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Enter Code (Optional)"
                  name="role"
                  min="0"
                  value={formData.role}
                  onChange={handleChange}
                />

                <small className="form-text text-muted">
                If no code is entered, you will be registered as a{" "}
                  <strong>Student</strong>.
                </small>
              </div>

              {/* Terms */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="terms"
                  required
                />
                <label className="form-check-label" htmlFor="terms">
                  I agree to the Terms & Conditions
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100">
                Register
              </button>
            </form>

            <p className="text-center mt-4 mb-0">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold text-decoration-none">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
