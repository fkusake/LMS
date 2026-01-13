function Footer() {
  return (
    <footer className="bg-white border-top mt-auto">
      <div className="container py-5">
        <div className="row gy-4">

          {/* Brand */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold text-primary">LMS</h5>
            <p className="text-muted small mt-3">
              A modern learning management system to learn, teach,
              and grow your skills anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2">
            <h6 className="fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-decoration-none text-muted">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/courses" className="text-decoration-none text-muted">
                  Courses
                </a>
              </li>
              <li className="mb-2">
                <a href="/dashboard" className="text-decoration-none text-muted">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-6 col-md-3">
            <h6 className="fw-semibold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">
                  Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-12 col-md-3">
            <h6 className="fw-semibold mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-primary fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-primary fs-5">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-primary fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="text-center mt-4 pt-3 border-top">
          <small className="text-muted">
            © {new Date().getFullYear()} LMS. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
