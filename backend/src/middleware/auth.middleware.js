import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = req.cookies?.jwt || authHeader?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthoriazzed -NO token provided" });
    }
    console.log("Auth Header:", authHeader);
    console.log("Token", token);
    console.log("Jwt secret", process.env.JWT_SECRET_KEY);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(402).json({ message: "Unauthriazed-Invalid token" });
    }
    console.log("Jwt", decoded);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(403).json({ message: "Unauthriazed-User not  found" });
    }
    console.log("user", user);
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect Middleware ", error);
    return res.status(400).json({ message: "Internal Error" });
  }
};
