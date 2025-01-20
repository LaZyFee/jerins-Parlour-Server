import express from 'express';
import { createPayPalPayment, executePayPalPayment } from '../Controller/PaypalPaymentController.js';
import { createStripeSession } from '../Controller/StripePaymentController.js';
const router = express.Router();


// Initiate PayPal payment
router.post('/paypal', createPayPalPayment);

// Execute PayPal payment
router.get('/paypal/success', executePayPalPayment);

// Initiate Stripe payment
// Create Stripe session for payment
router.post('/stripe', createStripeSession);


export default router;