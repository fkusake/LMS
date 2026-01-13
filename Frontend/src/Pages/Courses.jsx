import FilterCard from "../components/FilterCard";
import { useEffect, useState } from "react";
import axios from "axios";
import img2 from "../assets/CodingPic1.jpg2.jpg";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserContext } from "../context/UserContext";
import { toast } from "react-toastify";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const { userData, valid } = getUserContext();

  const category = searchParams.get("category");
  const level = searchParams.get("level");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          axios.get(
            `https://lms-w4dk.onrender.com/api/courses?category=${category}&level=${level}&minPrice=${minPrice}&maxPrice=${maxPrice}`
          ),
          axios.get("https://lms-w4dk.onrender.com/api/category"),
        ]);
        setCourses(coursesRes.data.result);
        setCategories(categoriesRes.data.result);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.result || "Server error");
      }
    };
    fetchData();
  }, [category, level, minPrice, maxPrice]);

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* MOBILE FILTER BUTTON */}
        <div className="col-12 d-lg-none">
          <button
            className="btn btn-outline-primary w-100 mb-3"
            data-bs-toggle="collapse"
            data-bs-target="#mobileFilters"
          >
            <i className="bi bi-funnel me-2"></i>
            Filter Courses
          </button>

          {/* COLLAPSIBLE FILTERS (MOBILE) */}
          <div className="collapse" id="mobileFilters">
            <FilterCard categories={categories} />
          </div>
        </div>

        {/* DESKTOP FILTER SIDEBAR */}
        <div className="col-lg-3 d-none d-lg-block">
          <FilterCard categories={categories} />
        </div>

        {/* COURSES GRID */}
        <div className="col-12 col-lg-9">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h4 className="fw-bold mb-0">All Courses</h4>

            {valid && userData.userRole === "instructor" ? (
              <Link className="btn btn-success mt-4 px-4" to="/addcourse">
                Add Course
              </Link>
            ) : null}
          </div>

          {/* Grid */}
          <div className="row g-4">
            {courses.map((course, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  {/* CATEGORY BADGE – TOP RIGHT */}
                  {course?.category && (
                    <span
                      className="badge bg-primary text-white position-absolute"
                      style={{ top: "10px", right: "10px", zIndex: 2 }}
                    >
                      {course?.category?.categoryName}
                    </span>
                  )}

                  <div style={{ height: "160px", overflow: "hidden" }}>
                    <img
                      src={img2}
                      alt={course.title}
                      className="img-fluid w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="card-body d-flex flex-column">
                    <span className="badge bg-primary bg-opacity-10 text-primary mb-2 align-self-start">
                      {course?.level}
                    </span>

                    <h6 className="fw-bold">{course?.title}</h6>

                    <p className="text-muted small mb-3">
                      Instructor: {course?.instructor?.name}
                    </p>

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fw-semibold">${course?.price}</span>
                      <Link
                        className="btn btn-sm btn-primary"
                        to={`/course/${course._id}`}
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
