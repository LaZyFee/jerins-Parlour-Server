export const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.isAdmin !== true) {
        return res.status(403).json({ message: "Access forbidden: Admins only" });
    }
    next();
};
