import stripe from "../Utils/stripe.js";
import { OrderModel } from '../Models/OrderModel.js';
import { BookingModel } from '../Models/BookingModel.js';

export const createStripeSession = async (req, res) => {
    const { orderItem, totalPrice, userId, bookingId, customerName, customerEmail, customerPhone } = req.body;

    // Check if required fields are present
    if (!orderItem || !totalPrice || !userId || !bookingId) {
        return res.status(400).json({ message: 'Invalid order data' });
    }

    const order = new OrderModel({
        orderItem,
        totalPrice,
        user: {
            id: userId,
            name: customerName,
            email: customerEmail,
            phone: customerPhone
        },
        booking: bookingId,
    });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: orderItem,
                    },
                    unit_amount: Math.round(totalPrice * 100), // Converting price to cents
                },
                quantity: 1, // Single product quantity
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/booking/booking-list`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        order.paymentResult = {
            id: session.id,
            status: 'succeeded',
            update_time: new Date(),
            email_address: customerEmail

        };
        await order.save();
        res.status(201).json({ sessionId: session.id });
        const booking = await BookingModel.findById(bookingId);
        booking.isPaid = true;
        booking.status = 'Confirmed';
        await booking.save();
    } catch (error) {
        console.error("Error creating Stripe session", error);
        res.status(500).json({ message: 'Stripe session creation failed', error });
    }
};