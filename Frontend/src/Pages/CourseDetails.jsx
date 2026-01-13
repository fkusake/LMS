import { Link, useParams } from "react-router-dom";
import img2 from "../assets/CodingPic1.jpg2.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserContext } from "../context/UserContext";
import { toast } from "react-toastify";

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const { valid, userData } = getUserContext(); // logged-in or not
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `https://lms-w4dk.onrender.com/api/courses/${id}`
        );
        setCourse(result.data.result);
        setEnrolledUsers(result.data.result.enrolledUsers);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.result || "Server error");
      }
    };
    fetchData();
  }, [id]);

  if (!course) {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted">Loading course details...</p>
      </div>
    );
  }

  // ⚠️ Backend should send this later
  const isEnrolled =
    enrolledUsers.includes(userData?.userId) ||
    course.instructor._id === userData?.userId; // boolean

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* LEFT SIDE – COURSE DETAILS */}
        <div className="col-12 col-lg-8">
          {/* Course Image */}
          <img
            src={img2}
            alt={course.title}
            className="img-fluid rounded mb-4"
          />

          {/* Title */}
          <h1 className="fw-bold">{course.title}</h1>
          <p className="text-muted mt-2">{course.description}</p>

          {/* Meta Info */}
          <div className="d-flex flex-wrap gap-3 my-3">
            <span className="badge bg-primary">{course.level}</span>
            <span className="badge bg-success">
              {course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)}{" "}
              Lessons
            </span>
          </div>

          {/* Instructor */}
          <p className="mb-4">
            <strong>Instructor:</strong> {course.instructor?.name}
          </p>

          <hr />

          {/* ================= WHAT YOU'LL LEARN ================= */}
          <h4 className="fw-bold mb-3">What you’ll learn</h4>

          <div className="row g-3 mb-4">
            {course.modules.map((module, mIndex) =>
              module.lessons.map((lesson, lIndex) => (
                <div key={`${mIndex}-${lIndex}`} className="col-md-6">
                  <div className="d-flex align-items-start gap-2">
                    <i className="bi bi-check-circle-fill text-primary mt-1"></i>
                    <span>{lesson.title}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <hr />

          {/* ================= COURSE CONTENT ================= */}
          <h4 className="fw-bold mb-3">Course Content</h4>

          <div className="accordion mb-4" id="courseContent">
            {course.modules.map((module, moduleIndex) => (
              <div className="accordion-item" key={moduleIndex}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed fw-semibold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#module-${moduleIndex}`}
                  >
                    Module {moduleIndex + 1}
                  </button>
                </h2>

                <div
                  id={`module-${moduleIndex}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#courseContent"
                >
                  <div className="accordion-body">
                    <ul className="list-group list-group-flush">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li
                          key={lessonIndex}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <span>{lesson.title}</span>

                          {isEnrolled ? (
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => setActiveLesson(lesson)}
                            >
                              Watch
                            </button>
                          ) : (
                            <span className="text-muted small">
                              <i className="bi bi-lock-fill me-1"></i>
                              Enroll to access
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* ================= VIDEO PLAYER ================= */}
          {activeLesson && isEnrolled && (
            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-bold mb-0">{activeLesson.title}</h5>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setActiveLesson(null)}
                  >
                    Close
                  </button>
                </div>

                <video
                  controls
                  width="100%"
                  onContextMenu={(e) => e.preventDefault()}
                  controlsList="nodownload"
                >
                  <source src="https://lms-w4dk.onrender.com/public/lesson.mp4" type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE – PAYMENT / ENROLL */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h3 className="fw-bold mb-3">
                {isEnrolled ? null : `$${course.price}`}
              </h3>
              {!valid ? (
                <Link className="btn btn-primary btn-lg w-100 mb-3" to="/login">
                  Login
                </Link>
              ) : userData?.userRole === "instructor" ? (
                isEnrolled ? (
                  <Link
                    className="btn btn-success btn-lg w-100 mb-3"
                    to={`/addcourse?courseId=${id}`}
                  >
                    Edit Course
                  </Link>
                ) : (
                  <Link
                    className="btn btn-primary btn-lg w-100 mb-3"
                    to="/addcourse"
                  >
                    Add Course
                  </Link>
                )
              ) : !isEnrolled ? (
                <Link
                  className="btn btn-primary btn-lg w-100 mb-3"
                  to={`/enrolled/${id}`}
                >
                  Enroll Now
                </Link>
              ) : (
                <button className="btn btn-primary btn-lg w-100 mb-3">
                  Enrolled
                </button>
              )}
              <hr />

              <h6 className="fw-bold">This course includes:</h6>
              <ul className="list-unstyled text-muted small">
                <li>✔ Full lifetime access</li>
                <li>✔ Certificate of completion</li>
                <li>✔ Downloadable resources</li>
                <li>✔ Access on mobile & desktop</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
