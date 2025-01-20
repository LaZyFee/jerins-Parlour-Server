// PayPalButton.jsx
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
const PayPalButton = ({ totalPrice, orderItems, userId }) => {
  const [loading, setLoading] = useState(true);

  const handleApprove = async (data, actions) => {
    try {
      const { data: paymentData } = await axios.post(`/payment/paypal`, {
        totalPrice,
        orderItems,
        userId,
      });
      window.location.href = paymentData.redirectUrl;
    } catch (error) {
      console.error("Error initiating PayPal payment:", error);
      toast.error("Failed to initiate PayPal payment");
    }
  };

  useEffect(() => {
    const loadPayPalScript = () => {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${
        import.meta.env.VITE_PAYPAL_CLIENT_ID
      }`;
      script.onload = () => setLoading(false);
      document.body.appendChild(script);
    };

    loadPayPalScript();
  }, []);

  if (loading) return <div>Loading...</div>; // Show a loading indicator

  return (
    <PayPalButtons
      createOrder={handleApprove}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          toast.success(
            `Transaction completed by ${details.payer.name.given_name}`
          );
        });
      }}
      onError={(err) => {
        toast.error("PayPal payment failed");
      }}
    />
  );
};
export default PayPalButton;
