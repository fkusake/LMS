import { Link } from "react-router-dom";
// import { getUserContext } from "../context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function EnrolledSuccess() {
  const { id } = useParams();

  useEffect(() => {
    async function enroll() {
      try {
        const token = localStorage.getItem("userToken").split('"')[1];
        const result = await axios.post(
          `https://lms-w4dk.onrender.com/api/courses/enroll/${id}`,
          {},
          { headers: { authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.result || "Server error");
      }
    }
    enroll();
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0 text-center p-4">
            {/* GREEN TICK */}
            <div className="mb-3">
              <i
                className="bi bi-check-circle-fill"
                style={{ fontSize: "4rem", color: "#28a745" }}
              ></i>
            </div>

            {/* MESSAGE */}
            <h3 className="fw-bold mb-2">Enrollment Successful!</h3>
            <p className="text-muted mb-4">
              You have been successfully enrolled in this course. You can now
              start learning and access all course content.
            </p>

            {/* ACTION BUTTONS */}
            <div className="d-flex flex-column gap-2">
              <Link to="/dashboard" className="btn btn-success btn-lg">
                Go to Dashboard
              </Link>

              <Link to="/courses" className="btn btn-outline-dark">
                Browse More Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
