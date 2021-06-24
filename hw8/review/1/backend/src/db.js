import {
  UserModel,
  ChatBoxModel,
  MessageModel,
  UserChatModel,
} from "./mongoose";

const fetchData = async () => {
  let users = await UserModel.find({});
  let messages = await MessageModel.find({});
  let chatBoxes = await ChatBoxModel.find({});
  let userChat = await UserChatModel.find({});
  db = { users, messages, chatBoxes, userChat };
  //   console.log(db.chatBoxes, db.messages);
};

// users = [
//   { id: "1", name: "Thomson" },
//   { id: "2", name: "Sam" },
//   { id: "3", name: "Michael" },
//   { id: "4", name: "Chole" },
// ];

// messages = [
//   { id: "101", sender: "Thomson", body: `Hi, I'm thomson` },
//   { id: "102", sender: "Sam", body: `Hi, I'm sam` },
//   { id: "103", sender: "Chole", body: `Hi, I'm Chole` },
//   { id: "104", sender: "Michael", body: `Hi, I'm Michael` },
//   { id: "105", sender: "Thomson", body: `Hi, your an asshole` },
// ];

// chatBoxes = [
//   {
//     id: "201",
//     name: "Sam_Thomson",
//     users: ["2", "1"],
//     messages: ["101", "102"],
//   },
//   {
//     id: "202",
//     name: "Sam_Michael",
//     users: ["2", "3"],
//     messages: ["104", "102"],
//   },
//   { id: "203", name: "Sam_Chole", users: ["2", "4"], messages: ["103", "102"] },
//   {
//     id: "204",
//     name: "Sam_Thomson",
//     users: ["2", "1"],
//     messages: ["102", "105"],
//   },
//   { id: "205", name: "Sam_Thomson", users: ["2", "1"], messages: [] },
// ];

let db = {};

export { fetchData, UserModel, MessageModel, ChatBoxModel, UserChatModel };
export { db as default };
