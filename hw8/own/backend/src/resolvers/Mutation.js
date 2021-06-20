import uuidv4 from 'uuid/v4';
import { makeName } from '../utilities'


const Mutation = {

  async createUser(parent, { name }, { db, pubsub }, info){
    if(!name)
      throw new Error("Missing User name")

    const existing = await db.UserModel.findOne({name})
    if(existing){
      // throw new Error("Already have user ", name)
      return existing
    }

    const newUser = {
      id: uuidv4(),
      name: name,
    }
    return new db.UserModel(newUser).save()
  },

  async createChatBox(parent, { name1, name2 },{ db, pubsub }, info){
    if (!name1 || !name2)
      throw new Error("Missing chatBox name for CreateChatBox");

    const chatBoxName = makeName(name1, name2);
    const existing = await db.ChatBoxModel.findOne({ name: chatBoxName });
    if (existing) {
      return existing
      throw new Error('already have chatBox', chatBoxName);
    }
    
    const newChatBox = {
      id: uuidv4(),
      name: chatBoxName,
      message: []
    }

    const box = await new db.ChatBoxModel(newChatBox).save()
    return box
  },

  async createMessage(parent, {sender, to, body}, {db, pubsub}, info){
    console.log("into backend createMsg")
    const chatBoxName = makeName(sender, to)
    
    const senderRef = await db.UserModel.find({name:sender})
    console.log(senderRef[0])

    const newMessage = {
      id: uuidv4(),
      sender: senderRef[0].id,
      body: body
    }

    pubsub.publish(`message ${chatBoxName}`,{
          message:{
            mutation: 'CREATED',
            data: newMessage,
            chatBoxName: chatBoxName
          }
      }
    )
    const dbNewMsg = await db.MessageModel(newMessage).save()
    // handle update chatBox
    let ChatBox = await db.ChatBoxModel.findOne({name:chatBoxName})
    ChatBox.messages.push(dbNewMsg.id)
    await ChatBox.save()

    return dbNewMsg
    // await new db.MessageModel(newMessage).save()
  }
};

export { Mutation as default };

