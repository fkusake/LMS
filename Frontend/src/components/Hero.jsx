import Hero from "../assets/heroImage.jpg";
import Styles from "../Styles/Home.module.css";
import { Link } from "react-router-dom";
import { getUserContext } from "../context/UserContext";

export default function CatchyHero() {
  const {valid} = getUserContext();

  return (
    <div className={`container-fluid ${Styles.heroDiv}`}>
      {/* INNER CONTAINER */}
      <div className="container">
        <div className="row align-items-center gy-5 py-5">

          {/* LEFT CONTENT */}
          <div className="col-12 col-lg-6 text-center text-lg-start text-white">
            <h1 className="display-4 fw-bold">
              Upgrade Your Skills with a{" "}
              <span className="fw-bold">Modern LMS</span>
            </h1>

            <p className="lead text-white-50 mt-3">
              Learn from industry experts, track your progress,
              and achieve your goals with our all-in-one learning platform.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 mt-4 justify-content-center justify-content-lg-start">
              {/* Primary CTA */}
              <Link className="btn btn-light btn-lg px-4 fw-semibold text-dark" to="/courses">
                Browse Courses
              </Link>

              {/* Secondary CTA */}
              {valid?null:<Link className="btn btn-outline-light btn-lg px-4 fw-semibold" to="/login">
                Join for Free
              </Link>}
            </div>
          </div>

          {/* RIGHT ILLUSTRATION */}
          <div className="col-lg-6 d-none d-lg-flex justify-content-center">
            <img
              src={Hero}
              alt="Online Learning Illustration"
              className="img-fluid"
              style={{ maxHeight: "420px" }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
