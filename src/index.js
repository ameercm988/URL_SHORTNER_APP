import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import redisClient from "./config/redis.js";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoute.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.Middleware.js";
import connectDB from "./config/db.js";
import fs from "fs"; // Use fs module to read JSON file
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();
// redisClient.on('connect', () => console.log('Connected to Redis'));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Session Management
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);

// Passport Authentication
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/api/short", urlRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send(`server connected to ${PORT}`);
});

// Error Handling Middleware
app.use(errorHandler);

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
