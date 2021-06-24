import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
const { Schema } = mongoose;
dotenv.config();
// i use mongodb://localhost:27017/cardmongo for MONGO_URL
if (!process.env.MONGO_URL) {
  console.error("Missing MONGO_URL!!!");
  process.exit(1);
}

function connectMongo() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Mongo database connected!");
  });
}

const userSchema = new Schema({
  name: { type: String, required: true },
});

const messageSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "User" },
  body: { type: String, required: true },
});

const chatBoxSchema = new Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});

const userChat = new Schema({
  name: { type: String, require },
  open: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  focus: { type: mongoose.Types.ObjectId, ref: "User" },
});

const UserModel = mongoose.model("User", userSchema);
const ChatBoxModel = mongoose.model("ChatBox", chatBoxSchema);
const MessageModel = mongoose.model("Message", messageSchema);
const UserChatModel = mongoose.model("UserChat", userChat);

export { connectMongo, UserModel, ChatBoxModel, MessageModel, UserChatModel };
