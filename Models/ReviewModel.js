import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    profilepic: { type: String, default: "" },
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: true },
    service: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

export const ReviewModel = mongoose.model("Review", reviewSchema)