import { configDotenv } from "dotenv";
configDotenv();

import { connectDB } from './src/Config/connectDB.js';
import app from './src/app.js';

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});
console.log("Server cold start at", new Date().toISOString());
app.use((req, res, next) => {
    console.time(`${req.method} ${req.url}`);
    res.on('finish', () => {
        console.timeEnd(`${req.method} ${req.url}`);
    });
    next();
});

export default app
