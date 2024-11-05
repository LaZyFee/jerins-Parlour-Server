import express from "express";
import { addService, getAllServices, updateService, removeService } from "../Controller/ServiceController.js";
import { uploadServicePic } from "../Utils/multer.js";

const router = express.Router();

// Add service with image upload
router.post("/addService", uploadServicePic.single("image"), addService);

// Update service with image upload
router.put("/updateService/:id", uploadServicePic.single("image"), updateService);

// Get all services
router.get("/getAllServices", getAllServices);

// Remove service
router.delete("/removeService/:id", removeService);

export default router;
