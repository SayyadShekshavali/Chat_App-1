import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./utils/MDB.connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/auth.middleware.js";
dotenv.config();
import path from "path";
const __dirname = path.resolve();
const PORT = process.env.PORT || 5003;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://chat-app-1-3tjs.onrender.com/", // your frontend domain
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("api/auth/me", protectRoute, (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({ user: req.user });
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.listen(PORT, () => {
  console.log(`server is running on the ${PORT}`);
  connectDB();
});
