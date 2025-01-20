import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: { type: String }, // Only set if signing up with Google
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique emails across all users
    },
    name: {
        type: String,
        required: function () {
            return !this.googleId; // Required only if googleId is not set
        },
    },
    username: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: function () {
            return !this.googleId; // Required only if googleId is not set
        },
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId; // Required only if googleId is not set
        },
    },
    profilePic: {
        type: String,
        default: "",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
