import express from "express";
import {
  getRocommendedUsers,
  getMyfriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendReqs,
} from "../controllers/user.controller.js";
const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";

//applied to all rotues

router.use(protectRoute);
router.get("/", getRocommendedUsers);
router.get("/friends", getMyfriends);
router.post("/friend-requests/:id", sendFriendRequest);
router.get("/friend-requests", getFriendRequests);
router.put("/friends-request/:id/accept", acceptFriendRequest);

router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;
