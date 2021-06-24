import { UserModel, MessageModel, ChatBoxModel } from "../db";
import { UserChatModel } from "../mongoose";
const Query = {
  async users(parent, args, { db }, info) {
    if (!args.name) return await UserModel.find({});
    return db.users.filter((data) => args.name === data.name);
  },
  async chatboxes(parent, args, { db }, info) {
    if (args.name === undefined) {
      let boxes = await ChatBoxModel.find({});
      return await Promise.all(
        boxes.map(async (box) => ({
          id: box.id,
          name: box.name,
          users: await Promise.all(
            box.users.map((id) => UserModel.findById(id))
          ),
          messages: await Promise.all(
            box.messages.map(async (id) => {
              let msg = await MessageModel.findById(id);
              msg.sender = await UserModel.findById(msg.sender);
              return msg;
            })
          ),
        }))
      );
    }
    let existed = await ChatBoxModel.findOne({ name: args.name });
    if (!existed) throw `ChatBox(${args.name}) Doesn't Exist`;
    let data = await Promise.all(
      db.chatBoxes
        .filter((data) => data.name === args.name)
        .map(async (box) => ({
          id: box.id,
          name: box.name,
          users: await Promise.all(
            box.users.map((id) => UserModel.findById(id))
          ),
          messages: await Promise.all(
            box.messages.map(async (id) => {
              let msg = await MessageModel.findById(id);
              msg.sender = await UserModel.findById(msg.sender);
              return msg;
            })
          ),
        }))
    );
    return data;
  },
  async userChat(parent, { name }, { db }, info) {
    let existing = await UserModel.findOne({ name });
    if (!existing) existing = await new UserModel({ name }).save();
    let Chating = await UserChatModel.findOne({ name });
    if (!Chating)
      Chating = await new UserChatModel({ name, open: [], focus: null }).save();
    Chating.open = await Promise.all(
      Chating.open.map((id) => UserModel.findById(id))
    );
    if (Chating.focus !== null) {
      Chating.focus = await UserModel.findById(Chating.focus);
      if (!Chating.focus) Chating.focus = Chating.open[0];
      const ChatBox = await ChatBoxModel.findOne({
        name: [name, Chating.focus.name].sort().join("_"),
      });
      if (!ChatBox) throw `Focus (${Chating.focus.name}) Has No ChatBox Yet`;
      Chating.messages = await Promise.all(
        ChatBox.messages.map(async (id) => {
          let msg = await MessageModel.findById(id);
          msg.sender = await UserModel.findById(msg.sender);
          return msg;
        })
      );
    } else {
      Chating.focus = { name: "NoOne" };
      Chating.messages = [];
    }
    return Chating;
  },
};

export default Query;
