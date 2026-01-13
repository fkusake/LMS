import CourseRepo from "./courseRepo.js";

export default class CourseController {
  constructor() {
    this.courseRepo = new CourseRepo();
  }

  async getAllCourses(req, res, next) {
    try {
      const { level, category, minPrice, maxPrice } = req.query;
      if (Number(minPrice) < 0 || Number(maxPrice) < 0) {
        return res.status(400).json({ result: "Invalid Price...!" });
      }
      const filters = {};

      if (category != "null" && category) {
        filters["category.categoryName"] = { $in: category.split(",") };
      }
      if (level != "null" && level) {
        filters.level = { $in: level.split(",") };
      }
      if (
        minPrice != "null" &&
        Number(minPrice) >= 0 &&
        maxPrice != "null" &&
        Number(maxPrice) >= 0
      ) {
        filters.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
      }

      const result = await this.courseRepo.getAllCourses(filters);
      return res.status(200).json({ result: result });
    } catch (error) {
      next(error);
    }
  }

  async getCourse(req, res, next) {
    try {
      const id = req.params.id;
      const result = await this.courseRepo.getCourse(id);
      return res.status(200).json({ result: result });
    } catch (error) {
      next(error);
    }
  }

  async addCourse(req, res, next) {
    try {
      const { newCourse } = req.body;
      if (Number(newCourse.price) < 0) {
        return res.status(400).json({ result: "Invalid Price...!" });
      }
      newCourse.instructor = req.userId;
      const result = await this.courseRepo.addCourse(newCourse);
      return res.status(200).json({ result: result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async enrollCourse(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.userId;
      const result = await this.courseRepo.enrollCourse(id, userId);
      return res.status(200).json({ result: result });
    } catch (error) {
      next(error);
    }
  }

  async instructorCourses(req, res, next) {
    try {
      const userId = req.userId;
      const result = await this.courseRepo.instructorCourses(userId);
      return res.status(200).json({ result: result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async studentCourses(req, res, next) {
    try {
      const userId = req.userId;
      const result = await this.courseRepo.studentCourses(userId);
      return res.status(200).json({ result: result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
