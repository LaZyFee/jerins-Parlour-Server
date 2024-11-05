import { BookingModel } from "../Models/BookingModel.js";
import { ReviewModel } from "../Models/ReviewModel.js";

// Add a booking (common for user or visitor)
export const addBooking = async (req, res) => {
    try {
        const { name, email, phone, service, total, userId } = req.body;
        if (!name || !email || !phone || !service || !total) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const booking = await BookingModel.create({
            userId,
            name,
            email,
            phone,
            service,
            total
        });

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Get all bookings
export const getAllBookingsForAdmin = async (req, res) => {
    try {
        const bookings = await BookingModel.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Update booking status (Confirm/Reject)
export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!["Confirmed", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const booking = await BookingModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        // Fetch email from query parameters
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        // Find all bookings with the provided email
        const bookings = await BookingModel.find({ email });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a booking
export const deleteBooking = async (req, res) => {
    try {
        const booking = await BookingModel.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted", booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Add a review
export const addReview = async (req, res) => {
    try {
        const { name, email, comment, service, rating, date, profilepic, username } = req.body;

        if (!name || !email || !comment || !service || !rating || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const review = await ReviewModel.create({
            profilepic,
            name,
            username,
            email,
            comment,
            date: new Date(date),
            rating,
            service,
        });

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getReviews = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const reviews = await ReviewModel.find({ email });

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found." });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 
