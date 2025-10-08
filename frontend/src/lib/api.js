import { Axis3D } from "lucide-react";
import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me", {
      headers: { "Cache-Control": "no-cache" },
    });
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser", error);
    return null;
  }
};

export const compeleteOnboading = async (formState) => {
  const res = await axiosInstance.post("/auth/onboarding", formState);
  return res.data;
};

export const getUserFriends = async () => {
  const res = await axiosInstance.get("/users/friends", {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  return Array.isArray(res.data) ? res.data : [];
};
export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/users");
  return Array.isArray(res.data) ? res.data : [];
};

export const getOutgoingFriendReqs = async () => {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  return Array.isArray(res.data) ? res.data : [];
};

export const sendFriendRequest = async (userId) => {
  const res = await axiosInstance.post(`/users/friend-requests/${userId}`);
  return res.data;
};

export const getFriendRequests = async () => {
  const res = await axiosInstance.get("/users/friend-requests");
  return res.data;
};

export const acceptFriendRequest = async (requestId) => {
  const res = await axiosInstance.put(
    `users/friend-requests/${requestId}/accept`
  );
  return res.data;
};
export const getStreamToken = async () => {
  const res = await axiosInstance.get("/chat/token");
  return res.data;
};
