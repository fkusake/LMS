import img1 from "../assets/CodingPic1.jpg1.jpg";
import img2 from "../assets/CodingPic1.jpg2.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://lms-w4dk.onrender.com/api/courses");
        setCourses(result.data.result);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.result || "Server error");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container py-5">
      {/* Section Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Featured Courses</h2>
        <p className="text-muted mt-2">
          Handpicked courses to kickstart your learning journey
        </p>
      </div>

      {/* Courses Grid */}
      <div className="row g-4">
        {courses.slice(0,4).map((course, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-3">
            
            {/* CARD */}
            <div className="card h-100 border-0 shadow-sm position-relative">

              {/* CATEGORY BADGE – TOP RIGHT */}
              {course.category && (
                <span
                  className="badge bg-primary text-white position-absolute"
                  style={{ top: "10px", right: "10px", zIndex: 2 }}
                >
                  {course?.category?.categoryName}
                </span>
              )}

              {/* IMAGE */}
              <div style={{ height: "160px", overflow: "hidden" }}>
                <img
                  src={img2}
                  alt={course?.title}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* CARD BODY */}
              <div className="card-body d-flex flex-column">
                <span className="badge bg-primary bg-opacity-10 text-primary mb-2 align-self-start">
                  {course?.level}
                </span>

                <h6 className="fw-bold">{course?.title}</h6>

                <p className="text-muted small mb-3">
                  {course?.description}
                </p>

                <p className="text-muted small mb-3">
                  Instructor: {course?.instructor?.name}
                </p>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">${course?.price}</span>
                  <Link
                    className="btn btn-sm btn-primary"
                    to={`course/${course?._id}`}
                  >
                    View Course
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Link to="/courses" className="btn btn-outline-dark px-4">
          View all courses
        </Link>
      </div>
    </div>
  );
}
