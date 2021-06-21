import { useState, useEffect } from "react";
import useClient from "./useClient";

const useChatBox = (activeKey) => {
  const { startChat, messages, sendMessage, temp, fetchData, setMessages } =
    useClient();

  const [chatBoxes, setChatBoxes] = useState([
    // { friend: "Mary", key: "MaryChatbox", chatLog: [] },
    // { friend: "Peter", key: "PeterChatBox", chatLog: [] },
  ]);
  // useEffect(() => {
  //   setMessages((msg) => {
  //     console.log(msg);
  //     return msg;
  //   });
  // }, [messages]);

  // useEffect(() => {
  //   msgRef.current = fetchData();
  //   console.log(msgRef.current);
  // });

  const createChatBox = (friend, me) => {
    const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    const newChatBoxes = [...chatBoxes];
    let chatLog = [];

    startChat(friend, me); // 新增一個對話後準備建立一個屬於兩人的chat_model

    // chatLog = chatLog.concat(messages);
    // console.log(chatLog);
    newChatBoxes.push({ friend, key: newKey, chatLog });
    setChatBoxes(newChatBoxes);
    // console.log(chatBoxes);
    // console.log(fetchData());
    console.log(chatBoxes);
    return newKey;
  };

  const removeChatBox = (targetKey, activeKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newChatBoxes = chatBoxes.filter(
      (chatBox) => chatBox.key !== targetKey
    );
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;
        } else {
          newActiveKey = newChatBoxes[0].key;
        }
      }
    } else newActiveKey = ""; // No chatBox left
    console.log(newChatBoxes);
    setChatBoxes(newChatBoxes);
    console.log(newActiveKey);
    return newActiveKey;
  };
  return { chatBoxes, createChatBox, removeChatBox };
};
export default useChatBox;
