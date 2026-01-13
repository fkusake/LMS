import { courseModel } from "./courseSchema.js";
import { categoryModel } from "../category/categorySchema.js";
import Error from "../Error/customError.js";

export default class CourseRepo {
  async getAllCourses(filters) {
    try {
      const courses = await courseModel
        .find(filters)
        .populate("instructor", "name")
        .populate("category", "name");
      return courses;
    } catch (error) {
      console.log(error);
      throw new Error(500, "Something went wrong with the database");
    }
  }

  async getCourse(id) {
    try {
      const course = await courseModel
        .findById(id)
        .populate("instructor", "name");
      return course;
    } catch (error) {
      throw new Error(500, "Something went wrong with the database");
    }
  }

  async addCourse(newCourse) {
    try {
    if (!newCourse.category?.categoryName) {
      throw new Error("Category name is required");
    }

    const categoryName = newCourse.category.categoryName
      .trim()
      .toLowerCase();

    const category = await categoryModel.findOneAndUpdate(
      { name: categoryName },
      { $setOnInsert: { name: categoryName } },
      { new: true, upsert: true }
    );

    const courseData = {
      title: newCourse.title.trim(),
      description: newCourse.description.trim(),
      price: Number(newCourse.price),
      level: newCourse.level,
      instructor: newCourse.instructor,
      category: {
        categoryId: category._id,
        categoryName: category.name,
      },
      modules: newCourse.modules,
      enrolledUsers: newCourse.enrolledUsers,
    };

    let course;

    if (newCourse._id) {
      course = await courseModel.findByIdAndUpdate(
        newCourse._id,
        courseData,
        { new: true, upsert: true, runValidators: true }
      );
    } else {
      course = await courseModel.create(courseData);
    }

    return course;
    } catch (error) {
      console.log(error);
      throw new Error(500, "Something went wrong with the database");
    }
  }

  async enrollCourse(id, userId) {
    try {
      const course = await courseModel.findByIdAndUpdate(
        id,
        { $addToSet: { enrolledUsers: userId } },
        { new: true }
      );

      if (!course) {
        throw new Error(402, "User already Enrolled");
      }
      return course;
    } catch (error) {
      console.log(error);
      throw new Error(500, "Something went wrong with the database");
    }
  }

  async instructorCourses(userId) {
    try {
      const courses = await courseModel.find({ instructor: userId }).populate("instructor", "name").populate("category", "name");
      return courses;
    } catch (error) {
      console.log(error);
      throw new Error(500, "Something went wrong with the database");
    }
  }

  async studentCourses(userId) {
    try {
      const courses = await courseModel.find({ enrolledUsers: userId }).populate("instructor", "name").populate("category", "name");
      return courses;
    } catch (error) {
      console.log(error);
      throw new Error(500, "Something went wrong with the database");
    }
  }
}
