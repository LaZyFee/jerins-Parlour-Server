//external imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";



//internal imports
import { connectDB } from "./Config/connectDB.js";
import authRoutes from "./Routes/authRoutes.js";
import serviceRoutes from "./Routes/serviceRoutes.js";
import bookingRoutes from "./Routes/bookingRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import "./Config/passportJs.js";

// Manually create __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

// Serve static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
    res.send("Hello World! from Jerins Parlour backend");
});

app.use("/", authRoutes);
app.use("/", serviceRoutes);
app.use("/", bookingRoutes);
app.use('/payment', paymentRoutes);
app.use("/", orderRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});