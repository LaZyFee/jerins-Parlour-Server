/* eslint-disable react/prop-types */

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-hot-toast";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripeButton = ({
  totalPrice,
  orderItem,
  userId,
  bookingId,
  customerName,
  customerEmail,
  customerPhone,
}) => {
  const [loading, setLoading] = useState(false);

  const handleStripePayment = async () => {
    setLoading(true);
    try {
      const { data: sessionData } = await axios.post(`/payment/stripe`, {
        orderItem,
        totalPrice,
        userId,
        customerName,
        customerEmail,
        customerPhone,
        bookingId,
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionData.sessionId,
      });

      if (error) {
        toast.error("Error redirecting to Stripe checkout");
        console.error(error);
      }
    } catch (error) {
      toast.error("Failed to initiate Stripe payment");
      console.error("Error creating Stripe session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleStripePayment}
      className="btn bg-[#F63E7B] text-white my-5"
      disabled={loading}
    >
      {loading ? "Processing..." : "Pay with Stripe"}
    </button>
  );
};

export default StripeButton;
