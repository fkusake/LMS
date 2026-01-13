import { userModel } from "../users/userSchema.js";
import { courseModel } from "../course/courseSchema.js";
import { categoryModel } from "../category/categorySchema.js";

const userData = [
  {
    name: "Gagan",
    email: "gagan20tvl@gmail.com",
    password: "password1",
    role: "instructor",
  },
  {
    name: "Ram",
    email: "ram1234@gmail.com",
    password: "password2",
    role: "student",
  },
];

const categoryData = [{ name: "webDev" }, { name: "DSA" }, { name: "AI" }];


export default async function seedData(req,res,next) {
  try {

    const addUsers = await userModel.insertMany(userData);
    const instructorId = addUsers.find((i) => {
      return i.role === "instructor";
    });

    const addCategory = await categoryModel.insertMany(categoryData);
    const categoryId = addCategory.find((i) => {
      return i.name === "webDev";
    });

  const courseData = [
      {
        title: "Full-Stack",
        description: "Its a Full-Stack Course",
        price: 299,
        lessons:43,
        level:"Beginner",
        instructor:instructorId._id,
        category:categoryId._id
      },
    ];

    await courseModel.insertMany(courseData);
    return res.status(201).json({message:"Data had been seeded"});
  } catch (error) {
    console.log(error);
  }
}
