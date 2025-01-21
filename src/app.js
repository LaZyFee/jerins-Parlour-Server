//external imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";



//internal imports
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

app.use(cors());
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


// Serve static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const clientPath = path.join(process.cwd(), "client", "dist");
app.use(express.static(clientPath));

app.use("/api", authRoutes);
app.use("/api", serviceRoutes);
app.use("/api", bookingRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api", orderRoutes);


// Catch-all route for React
app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

console.log("Uploads Path:", path.join(__dirname, 'uploads'));
console.log("Client Path:", clientPath);


export default app;