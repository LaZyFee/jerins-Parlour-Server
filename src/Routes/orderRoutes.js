import { OrderModel } from "../Models/OrderModel.js";
import express from "express";

const router = express.Router();

// Route to get all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
