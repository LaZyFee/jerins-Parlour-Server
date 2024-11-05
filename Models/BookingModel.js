import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    userId: mongoose.Schema.Types.ObjectId,
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Rejected"],
        default: "Pending"
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
}, {
    timestamps: true
});

export const BookingModel = mongoose.model("Booking", bookingSchema);