import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getUserContext } from "../context/UserContext";
import img2 from "../assets/CodingPic1.jpg2.jpg";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const { userData, valid } = getUserContext();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("userToken").split('"')[1];
      try {
        if (userData?.userRole === "instructor") {
          const result = await axios.get(
            "http://localhost:3000/api/courses/instructorcourses",
            { headers: { authorization: `Bearer ${token}` } }
          );
          setCourses(result.data.result);
        } else {
          const result = await axios.get(
            "http://localhost:3000/api/courses/studentcourses",
            { headers: { authorization: `Bearer ${token}` } }
          );
          setCourses(result.data.result);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.result || "Server error");
      }
    };

    fetchDashboardData();
  }, []);

  if (!valid) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card shadow-sm border-0 p-4">
              <h4 className="fw-bold mb-3">Please Login</h4>
              <p className="text-muted mb-4">
                You need to be logged in to access the dashboard.
              </p>
              <Link to="/login" className="btn btn-primary px-4">
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* USER INFO */}
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h4 className="fw-bold mb-3">Dashboard</h4>

          <div className="row">
            <div className="col-md-4">
              <p className="mb-1 text-muted">Name</p>
              <h6 className="fw-semibold">{userData.userName}</h6>
            </div>

            <div className="col-md-4">
              <p className="mb-1 text-muted">Email</p>
              <h6 className="fw-semibold">{userData.userEmail}</h6>
            </div>

            <div className="col-md-4">
              <p className="mb-1 text-muted">Role</p>
              <span className="badge bg-primary text-white">
                {userData.userRole}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* COURSES SECTION */}
      <div className="mb-3">
        <h5 className="fw-bold">
          {userData.userRole === "student" ? "Enrolled Courses" : "My Courses"}
        </h5>
      </div>

      {courses.length === 0 ? (
        <p className="text-muted">
          {userData.userRole === "student"
            ? "You are not enrolled in any courses yet."
            : "You haven't created any courses yet."}
        </p>
      ) : (
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
      )}
    </div>
  );
}
