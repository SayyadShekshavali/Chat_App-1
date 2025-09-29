import express from "express";
import User from "../models/User.js";
import FriendRequest from "../models/Friends.js";
export const getRocommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const currentUser = await User.findById(currentUserId).select("friends");
    const recommemdedUser = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { _id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recommemdedUser);
  } catch (error) {
    console.log("Error in RecommendedUsers controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getMyfriends = async (req, res) => {
  try {
    console.log("req.user:", req.user);

    const user = await User.findById(req.user._id)
      .select("friends")
      .populate(
        "friends",
        "fullName Profilepic nativeLanguage learningLanguage"
      );
    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getFriends controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const myId = req.user._id;
    const recipientId = req.params.id;
    console.log("recipientId:", req.params.id);
    console.log("senderId:", req.user._id);

    if (myId == recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send friends request to yourself" });
    }
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(400).json({ message: "Recipient not found" });
    }
    if (recipient.friends.some((fid) => fid.toString() === myId.toString())) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "You are Already Sended request to   this User" });
    }
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });
    res.status(200).json(friendRequest);
  } catch (error) {
    console.log("Error in SendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this request" });
    }
    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });
    res.status(200).json({ message: "Friend request is accepted" });
  } catch (error) {
    console.log("Error in AcceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullName Profilepic nativeLanguage learningLanguage"
    );
    const acceptedReqs = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "fullName Profilepic");
    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getFriendsRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOutgoingFriendReqs = async (req, res) => {
  try {
    const outgoingReqs = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName Profilepic nativeLanguage learningLanguage"
    );
    res.status(200).json(outgoingReqs);
  } catch (error) {
    console.log("Error in getOutGoingFriendsRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
