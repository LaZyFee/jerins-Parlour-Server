import paypal from 'paypal-rest-sdk';
import { OrderModel } from '../Models/OrderModel.js';
import { BookingModel } from '../Models/BookingModel.js'; // For updating booking status

// Initiate PayPal payment
export const createPayPalPayment = async (req, res) => {
    const { totalPrice, orderItems, userId, userName, userEmail, userPhone, bookingId } = req.body;

    const order = new OrderModel({
        user: {
            id: userId,
            name: userName,
            email: userEmail,
            phone: userPhone
        },
        orderItem: orderItems,
        totalPrice,
        booking: bookingId
    });

    const createPaymentJson = {
        intent: 'sale',
        payer: { payment_method: 'paypal' },
        redirect_urls: {
            return_url: `${process.env.FRONTEND_URL}/booking/booking-list`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        },
        transactions: [
            {
                item_list: { items: orderItems },
                amount: { currency: 'USD', total: totalPrice.toFixed(2) },
                description: `Payment for ${orderItems}`
            }
        ]
    };

    paypal.payment.create(createPaymentJson, async (error, payment) => {
        if (error) {
            console.error('Error creating PayPal payment:', error);
            return res.status(500).json({ message: 'Error creating PayPal payment' });
        } else {
            const redirectUrl = payment.links.find((link) => link.rel === 'approval_url').href;
            try {
                order.paymentResult = { id: payment.id, status: 'created' };
                await order.save();
                res.status(201).json({ paymentId: payment.id, redirectUrl });
            } catch (err) {
                console.error('Error saving order:', err);
                res.status(500).json({ message: 'Error saving order' });
            }
        }
    });
};


// Execute PayPal payment after user returns
export const executePayPalPayment = async (req, res) => {
    const { paymentId, PayerID } = req.query;

    const executePaymentJson = { payer_id: PayerID };

    paypal.payment.execute(paymentId, executePaymentJson, async (error, payment) => {
        if (error) {
            console.error('PayPal Payment Execution Error:', error);
            return res.status(500).json({ message: 'Error executing PayPal payment' });
        } else {
            try {
                const order = await OrderModel.findOneAndUpdate(
                    { 'paymentResult.id': paymentId },
                    {
                        isPaid: true,
                        paidAt: new Date(),
                        paymentResult: {
                            id: payment.id,
                            status: payment.state,
                            update_time: payment.update_time,
                            email_address: payment.payer.payer_info.email,
                        },
                    },
                    { new: true }
                );

                // Update booking status as paid and confirmed
                const booking = await BookingModel.findById(order.booking);
                if (booking) {
                    booking.isPaid = true;
                    booking.status = 'Confirmed';
                    await booking.save();
                }

                res.status(200).json({ message: 'Payment successful', order });
            } catch (err) {
                console.error('Error updating order:', err);
                res.status(500).json({ message: 'Error updating order' });
            }
        }
    });
};
