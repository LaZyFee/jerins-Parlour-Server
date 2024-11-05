import multer from "multer";
import path from "path";

// Storage engine for profile pictures
const profilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/profile-pics/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Storage engine for service pictures
const servicePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/service-pics/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter (common for both profile and service images)
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("Only images are allowed"));
    }
};

// Upload for profile pictures
export const uploadProfilePic = multer({
    storage: profilePicStorage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter: fileFilter
});

// Upload for service pictures
export const uploadServicePic = multer({
    storage: servicePicStorage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter: fileFilter
});
