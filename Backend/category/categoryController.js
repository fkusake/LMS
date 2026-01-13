import CategoryRepo from "./categoryRepo.js";

export default class CategoryController {
  constructor() {
    this.categoryRepo = new CategoryRepo();
  }

  async getCategory(req,res,next) {
    try{
        const result = await this.categoryRepo.getCategory();
        return res.status(200).json({result:result});
    }catch(error){
        next(error);
    }
  }
}
