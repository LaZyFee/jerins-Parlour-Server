import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    orderItem: { type: String, required: true },
    totalPrice: { type: Number, required: true },

    paidAt: { type: Date },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    createdAt: { type: Date, default: Date.now }
});

export const OrderModel = mongoose.model('Order', orderSchema);
