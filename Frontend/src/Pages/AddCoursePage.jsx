import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddCourse() {
  const [searchParams] = useSearchParams();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: 0,
    level: "",
    category: "",
    modules: [],
    enrolledUsers:[]
  });
  const [categories, setCategories] = useState([]);
  const [useNewCategory, setUseNewCategory] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (searchParams.get("courseId")) {
          const result = await axios.get(
            `https://lms-w4dk.onrender.com/api/courses/${searchParams.get("courseId")}`
          );
          setCourse(result.data.result);
        }
        const res = await axios.get("https://lms-w4dk.onrender.com/api/category");
        setCategories(res.data.result);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.result || "Server error");
      }
    };

    fetchCategories();
  }, []);

  /* ---------------- BASIC COURSE HANDLERS ---------------- */

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  /* ---------------- MODULE HANDLERS ---------------- */

  const addModule = () => {
    setCourse({
      ...course,
      modules: [...course.modules, { lessons: [] }],
    });
  };

  const addLesson = (moduleIndex) => {
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex].lessons.push({ title: "", video: "" });
    setCourse({ ...course, modules: updatedModules });
  };

  const handleLessonChange = (e, moduleIndex, lessonIndex) => {
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex].lessons[lessonIndex][e.target.name] =
      e.target.value;
    setCourse({ ...course, modules: updatedModules });
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCourse = {
      title: course.title,
      description: course.description,
      price: course.price,
      level: course.level,
      category: course.category,
      modules: course.modules,
      enrolledUsers:course.enrolledUsers
    };

    course?._id?newCourse._id = course._id:null;

    const token = localStorage.getItem("userToken").split('"')[1];
    try {
      await axios.post("https://lms-w4dk.onrender.com/api/courses/addcourse", {
        newCourse,
      }, { headers: { authorization: `Bearer ${token}` } });
      navigate("/courses");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.result || "Server error");
    }
  };

  /* ---------------- UI ---------------- */

  const handleCategorySelect = (e) => {
    const selectedId = e.target.value;
    const selectedCategory = categories.find((cat) => cat._id === selectedId);
    console.log(selectedCategory);
    setCourse({
      ...course,
      category: {
        categoryName: selectedCategory.name,
      },
    });
  };

  const handleNewCategoryChange = (e) => {
    setCourse({
      ...course,
      category: {
        categoryName: e.target.value,
      },
    });
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Add New Course</h2>

      <form onSubmit={handleSubmit}>
        {/* COURSE INFO */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Course Details</h5>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Course Title"
              name="title"
              value={course.title}
              onChange={handleChange}
              required
            />

            <textarea
              className="form-control mb-3"
              placeholder="Course Description"
              name="description"
              rows="3"
              value={course.description}
              onChange={handleChange}
              required
            />

            <div className="row">
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Price"
                  name="price"
                  min="0"
                  value={course.price}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <select
                  className="form-select mb-3"
                  name="level"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Category</label>

                {!useNewCategory ? (
                  <>
                    {/* EXISTING CATEGORY DROPDOWN */}
                    <select
                      className="form-select mb-2"
                      onChange={handleCategorySelect}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      className="btn btn-sm btn-link p-0"
                      onClick={() => setUseNewCategory(true)}
                    >
                      + Add new category
                    </button>
                  </>
                ) : (
                  <>
                    {/* NEW CATEGORY INPUT */}
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter new category"
                      onChange={handleNewCategoryChange}
                      required
                      to
                    />

                    <button
                      type="button"
                      className="btn btn-sm btn-link p-0"
                      onClick={() => setUseNewCategory(false)}
                    >
                      ← Select existing category
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Course Modules</h5>

            {course.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="border rounded p-3 mb-3">
                <h6 className="fw-semibold">Module {moduleIndex + 1}</h6>

                {module.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="row g-2 mb-2">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Lesson Title"
                        name="title"
                        value={lesson.title}
                        onChange={(e) =>
                          handleLessonChange(e, moduleIndex, lessonIndex)
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Video URL"
                        name="video"
                        value={lesson.video}
                        onChange={(e) =>
                          handleLessonChange(e, moduleIndex, lessonIndex)
                        }
                        required
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary mt-2"
                  onClick={() => addLesson(moduleIndex)}
                >
                  + Add Lesson
                </button>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-primary"
              onClick={addModule}
            >
              + Add Module
            </button>
          </div>
        </div>

        {/* SUBMIT */}
        <button className="btn btn-success mt-4 px-4" type="submit">
          Save Course
        </button>
      </form>
    </div>
  );
}
