import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Courses from "./Pages/Courses";
import Register from "./Pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CourseDetails from "./Pages/CourseDetails";
import CheckoutPage from "./Pages/CheckoutPage";
import AddCourse from "./Pages/AddCoursePage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/DashboardPage";
import EnrolledSuccess from "./Pages/EnrolledPage";

function App() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/enrolled/:id" element={<EnrolledSuccess />} />
          <Route path="/course/:id" element={<CourseDetails />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
