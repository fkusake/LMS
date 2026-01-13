import { Link } from "react-router-dom";
import { getUserContext } from "../context/UserContext";

function Navbar() {
  const { userData, logout, valid } = getUserContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 sticky-top">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          SmartLMS
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarLMS"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarLMS">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/courses">
                Courses
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>

          {/* Right side */}
          <div className="d-flex">
            {valid?<span className="navbar-text fw-semibold me-3 text-primary">
              🎓 Welcome, {userData.userName}
            </span>:null}
            {valid ? (
              <button className="btn btn-primary px-4" onClick={logout}>
                Logout
              </button>
            ) : (
              <Link className="btn btn-primary px-4" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
