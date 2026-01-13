import mongoose from "mongoose";

const lessonSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
});

const moduleSchema = mongoose.Schema({
  lessons: [lessonSchema],
});

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  level: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  category: {
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "categories",
    },
    categoryName: { type: String, required: true },
  },
  enrolledUsers: [
    {
      type: mongoose.Schema.ObjectId,
    },
  ],  
  modules: [moduleSchema],
});

export const courseModel = mongoose.model("courses", courseSchema);
