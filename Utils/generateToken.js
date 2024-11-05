import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return token;
};
