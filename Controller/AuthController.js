import { UserModel } from "../Models/AuthModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/generateToken.js";

export const registerUser = async (req, res) => {
    try {
        const { name, username, email, phone, password } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload profile picture
        const profilePicPath = req.file ? req.file.path.replace(/\\/g, "/") : "";
        // Create the user with hashed password
        const user = await UserModel.create({
            name,
            username,
            email,
            phone,
            password: hashedPassword,
            profilePic: profilePicPath,
        });

        // Generate JWT token
        const token = generateToken(user);

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                profilePic: user.profilePic,
            },
            token,  // Include token in response
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await UserModel.findOne({ email });
        // console.log(user);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                profilePic: user.profilePic,
                isAdmin: user.isAdmin,
            },
            token,  // Include the token in the response
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const logoutUser = async (req, res) => {
    try {
        res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const checkAdmin = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ isAdmin: user.isAdmin });
    } catch (error) {
        console.error("Error checking admin status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const makeAdmin = async (req, res) => {
    try {
        const { email } = req.body; // Get the email from request body
        const user = await UserModel.findOne({ email }); // Find user by email

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isAdmin = true; // Promote the user to admin
        await user.save();
        res.json({ message: "User promoted to admin" });
    } catch (error) {
        console.error("Error promoting user to admin:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const googleAuth = async (req, res) => {
    try {
        const { googleId, email, name, profilePic } = req.user;

        // Check for an existing user or create a new one
        let user = await UserModel.findOne({ googleId });

        if (!user) {
            user = await UserModel.create({
                googleId,
                email,
                name,
                username: name, // Default username
                profilePic,
            });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Redirect with token and serialized user object as query parameters
        const userQuery = JSON.stringify({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            isAdmin: user.isAdmin,
        });

        res.redirect(
            `${process.env.FRONTEND_URL}/login/success?token=${token}&user=${encodeURIComponent(userQuery)}`
        );

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


