import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
console.log("Environment Mode:", process.env.NODE_ENV);
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe Secret Key is missing!");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default stripe;
