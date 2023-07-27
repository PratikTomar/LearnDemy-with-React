import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    id: Number,
    title: String,
    price: Number,
    rating: Number,
    reviews: Number,
    trainerName: String,
    imageUrl: String,
    description: String,
    badge: String,
    actualPrice: Number,
    discountedPrice: Number,
  },
  { timestamps: true }
);
export const Courses = mongoose.model("Course", courseSchema);