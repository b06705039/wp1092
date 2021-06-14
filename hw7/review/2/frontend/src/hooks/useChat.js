import { useState } from "react";
// import useChatBox from "./useChatBox";

const client = new WebSocket('ws://localhost:8080')

const useChat = (me, chatBoxes, setChatBoxes) => {
  const [status, setStatus] = useState({}); // { type, msg }
  // const { chatBoxes, setChatBoxes } = useChatBox();

  client.onmessage = ({ data }) => {

    const { type, key, body } = JSON.parse(data);
    const newChatBoxes = [...chatBoxes];
    const activeKey = key;
    const index = newChatBoxes.findIndex(box => box.key === activeKey);

    switch(type){
      case "CHAT": {
        const { messages } = body;
        newChatBoxes[index].chatLog = messages;
        setStatus({
          type: "success",
          msg: "Message loaded."
        });
        break;
      }
      case "MESSAGE": {
        const { message } = body;
        newChatBoxes[index].chatLog.push(message)
        setStatus({
          type: "success",
          msg: "Message sent.",
        });
        break;
      }
    }
    setChatBoxes(newChatBoxes)
  }

  const sendData = async (data) => {
    await client.send(JSON.stringify(data))
  }

  const sendMessage = (payload) => {
    sendData({ type: "MESSAGE", payload });
  };

  const sendChat = (payload) => {
    sendData({ type: "CHAT", payload });
  };

  return { status, sendMessage, sendChat };
};
export default useChat;
