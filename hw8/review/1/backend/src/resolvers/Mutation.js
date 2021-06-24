import { UserModel, MessageModel, ChatBoxModel, UserChatModel } from "../db";
function makechatname(name1, name2) {
  return [name1, name2].sort().join("_");
}
const Mutation = {
  async createUser(parent, { data: { name } }, { db }, info) {
    const existing = await UserModel.findOne({ name });
    if (existing) return existing;
    let newUser = await new UserModel({ name }).save();
    db.users.push(newUser);
    return newUser;
  },
  async createMessage(
    parent,
    { data: { sender, to, body } },
    { db, pubsub },
    info
  ) {
    const existing1 = await UserModel.findOne({ name: sender });
    if (!existing1) throw `User(${sender}) Doesn't Exist`;
    const existing2 = await UserModel.findOne({ name: to });
    if (!existing2) throw `User(${to}) Doesn't Exist`;
    let chatroom = makechatname(sender, to);
    const existingRoom = await ChatBoxModel.findOne({ name: chatroom });
    if (!existingRoom) throw `Chatroom(${chatroom}) Doesn't Exist`;

    let newMsg = await new MessageModel({ sender: existing1, body }).save();
    existingRoom.messages.push(newMsg);
    db.messages.push(newMsg);
    pubsub.publish(`newMessage`, {
      newMessage: {
        mutation: "CREATE",
        sender,
        to,
        body,
      },
    });
    await existingRoom.save();
    return newMsg;
  },
  async createChatbox(parent, { data: { name1, name2 } }, { db }, info) {
    let existing1 = await UserModel.findOne({ name: name1 });
    if (!existing1) existing1 = await new UserModel({ name: name1 }).save();
    let UserChat = await UserChatModel.findOne({ name: name1 });

    let existing2 = await UserModel.findOne({ name: name2 });
    if (!existing2) existing2 = await new UserModel({ name: name2 }).save();

    if (!UserChat)
      UserChat = await new UserChatModel({
        name: name1,
        open: [existing2],
        focus: existing2,
      }).save();
    else {
      if (!UserChat.open.includes(existing2.id))
        UserChat.open.push(existing2.id);
      UserChat.focus = existing2.id;
      UserChat.save();
    }

    let chatboxName = makechatname(name1, name2);
    let existing = await ChatBoxModel.findOne({ name: chatboxName });
    if (!existing) {
      existing = await new ChatBoxModel({
        name: chatboxName,
        users: [existing1, existing2],
        messages: [],
      }).save();
      db.chatBoxes.push(existing);
    } else {
      existing.users = await Promise.all(
        existing.users.map((id) => UserModel.findById(id))
      );
      existing.messages = await Promise.all(
        existing.messages.map(async (id) => {
          let msg = await MessageModel.findById(id);
          msg.sender = await UserModel.findById(msg.sender);
          return msg;
        })
      );
    }
    return existing;
  },
  async ClearData(parent, { type }, { db }, info) {
    if (!type) {
      await UserModel.deleteMany();
      await MessageModel.deleteMany();
      await ChatBoxModel.deleteMany();
      db.users = [];
      db.messages = [];
      db.chatBoxes = [];
      return "Data is cleared";
    }
    switch (type) {
      case "Users":
        await UserModel.deleteMany();
        db.users = [];
        break;
      case "Messages":
        await MessageModel.deleteMany();
        db.messages = [];
        break;
      case "ChatBoxes":
        await ChatBoxModel.deleteMany();
        db.chatBoxes = [];
        break;
      default:
        throw `Type(${type}) Doesn't Exist`;
    }
    return `${type} Are Cleared`;
  },
  async CloseUser(parent, { data: { name1, name2 } }, { db }, info) {
    let UserChat = await UserChatModel.findOne({ name: name1 });
    if (!UserChat) throw `UserChat(${name1}) Not Found`;
    let RemoveUser = await UserModel.findOne({ name: name2 });
    if (!RemoveUser) throw `User(${name2}) Not Found`;
    if (UserChat.open.length === 0) throw `Error No Users Can be Delete`;
    UserChat.open = await Promise.all(
      UserChat.open.map((id) => UserModel.findById(id))
    );
    if (!RemoveUser in UserChat.open) {
      throw `Remove User Not in Opens`;
    }
    let NextUserIndex = -1;
    for (let i = 0; i < UserChat.open.length; i++) {
      if (UserChat.open[i].name === RemoveUser.name) {
        NextUserIndex = i;
        break;
      }
    }
    if (NextUserIndex === UserChat.open.length - 1) NextUserIndex -= 1;
    UserChat.open = UserChat.open.filter(
      (user) => user.name !== RemoveUser.name
    );
    UserChat.focus = await UserModel.findById(UserChat.focus);
    if (UserChat.open.length === 0) {
      UserChat.focus = null;
      return UserChat.save();
    }
    if (!UserChat.focus) throw `No Focus`;
    if (NextUserIndex !== null && NextUserIndex < UserChat.open.length)
      UserChat.focus = UserChat.open[NextUserIndex];
    else throw `Error Focus`;
    UserChat.save();
    return UserChat;
  },
};

export default Mutation;
