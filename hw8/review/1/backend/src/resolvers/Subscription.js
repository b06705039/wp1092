import { ChatBoxModel, MessageModel } from "../db";
const Subscription = {
  newMessage: {
    async subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator(`newMessage`);
    },
  },
};

export default Subscription;
