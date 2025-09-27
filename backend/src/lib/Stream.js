import { StreamChat } from "stream-chat";
import "dotenv/config";
const apiKey = process.env.STREAM_KEY;
const secretapiKey = process.env.STREAM_SECRETKEY;

if (!apiKey || !secretapiKey) {
  console.log(" ❌Stream api keys are missing");
}

const streamClient = StreamChat.getInstance(apiKey, secretapiKey);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    return userData;
  } catch (error) {
    console.log("Error in  upsertStreamUser Stream", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    //ensure userid is a string
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.log("Error in generateStreamToken  Stream", error);
  }
};
