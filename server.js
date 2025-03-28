import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv/config";


const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection (Async)
let db;
(async () => {
    db = await mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "yoga_studio",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
    console.log("✅ Connected to MySQL database!");
})();

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ MySQL Database Connection
db.getConnection()
    .then(() => console.log("✅ Connected to MySQL database!"))
    .catch((err) => {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1);
    });
db.query("SELECT 1", (err, result) => {
        if (err) {
            console.error("❌ Database Test Failed:", err);
        } else {
            console.log("✅ Database Test Successful!");
        }
    });
    

// ✅ Global Error Handling
process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled Promise Rejection:", err);
});

// ✅ Middleware to Verify Token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // 🔹 Now using cookies
    if (!token) return res.status(403).json({ error: "Access denied!" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Invalid token!" });
        req.user = decoded;
        next();
    });
};

// ✅ User Sign Up
app.post("/api/signup", async (req, res) => {
    const { signup_name, signup_email, signup_password, signup_weight, health_condition, other_disease, role } = req.body;

    if (!signup_name || !signup_email || !signup_password) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    // 🔹 Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signup_email)) {
        return res.status(400).json({ error: "Invalid email format!" });
    }

    try {
        const hashedPassword = await bcrypt.hash(signup_password, 10);
        const query = "INSERT INTO users (name, email, password, weight, health_condition, other_disease, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
        await db.execute(query, [signup_name, signup_email, hashedPassword, signup_weight, health_condition, other_disease || null, role || "user"]);
        
        res.status(201).json({ message: "✅ User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Database error!" });
    }
});

// ✅ User Sign In
app.post("/api/signin", async (req, res) => {
    const { signin_email, signin_password } = req.body;

    if (!signin_email || !signin_password) {
        return res.status(400).json({ error: "Email and Password are required!" });
    }

    try {
        const [results] = await db.execute("SELECT * FROM users WHERE email = ?", [signin_email]);
        if (results.length === 0) return res.status(401).json({ error: "Invalid email or password!" });

        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(signin_password, user.password);
        if (!isPasswordMatch) return res.status(401).json({ error: "Invalid email or password!" });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true, secure: false }); // 🔹 Secure in production
        res.json({ message: "✅ Login successful!", token });
    } catch (error) {
        res.status(500).json({ error: "Database error!" });
    }
});

// ✅ Fetch Yoga & Diet Plans (Protected Route)
app.get("/", (req, res) => {
    res.send("<h1>✅ Yoga Studio API is Running!</h1>");
});

// ✅ Password Reset Request
app.post("/api/reset-password", async (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 3600000; // 1 hour expiry

    try {
        await db.execute("UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?", [token, expiry, email]);

        // ✅ Send Email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            text: `Click here to reset your password: http://localhost:3000/reset-password/${token}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return res.status(500).json({ error: "Email not sent!" });
            res.json({ message: "✅ Password reset link sent to email!" });
        });
    } catch (error) {
        res.status(500).json({ error: "Database error!" });
    }
});

// ✅ Reset Password
app.post("/api/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const [results] = await db.execute("SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?", [token, Date.now()]);
        if (results.length === 0) return res.status(400).json({ error: "Invalid or expired token!" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.execute("UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?", [hashedPassword, results[0].id]);

        res.json({ message: "✅ Password reset successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Database error!" });
    }
});

// ✅ Logout Route
app.post("/api/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "✅ Logged out successfully!" });
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
