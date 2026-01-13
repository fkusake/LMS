import express from "express";
import CourseController from "./courseController.js";
import jwtAuth from "../middlewares/auth.js";

//User Router :
const courseRouter = express.Router();

// Course Instance :
const courseInstance = new CourseController();

// Get all Courses :
courseRouter.get("/", (req, res, next) => {
  courseInstance.getAllCourses(req, res, next);
});

//Get user Courses :
courseRouter.get("/instructorcourses", jwtAuth, (req, res, next) => {
  courseInstance.instructorCourses(req, res, next);
});

//Get user Courses :
courseRouter.get("/studentcourses", jwtAuth, (req, res, next) => {
  courseInstance.studentCourses(req, res, next);
});


// Get course by ID :
courseRouter.get("/:id", (req, res, next) => {
  courseInstance.getCourse(req, res, next);
});

// Add new Course :
courseRouter.post("/addcourse", jwtAuth, (req, res, next) => {
  courseInstance.addCourse(req, res, next);
});

courseRouter.post("/enroll/:id", jwtAuth, (req, res, next) => {
  courseInstance.enrollCourse(req, res, next);
});

export default courseRouter;
