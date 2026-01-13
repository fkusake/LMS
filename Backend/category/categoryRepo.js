import { categoryModel } from "./categorySchema.js";
import Error from "../Error/customError.js";

export default class CategoryRepo {
  async getCategory() {
    try {
      const categories = await categoryModel.find();
      return categories;
    } catch (error) {
      throw new Error(500, "Something went wrong with the database");
    }
  }
}
