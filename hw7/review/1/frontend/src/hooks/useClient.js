import { useState, useEffect, useRef } from "react";
const client = new WebSocket("ws://localhost:8080");

const useClient = () => {
  client.onopen = () => console.log("Server connected.");
  client.onmessage = (m) => {
    onEvent(JSON.parse(m.data));
    // console.log(JSON.parse(m.data));
  };
  client.sendEvent = async (e) => await client.send(JSON.stringify(e));

  const [messages, setMessages] = useState([]);
  // const msgRef = useRef(messages);
  // useEffect(() => {
  //   msgRef.current = messages;
  //   console.log(msgRef.current);
  // }, []);

  const startChat = (friend, me) => {
    if (!me || !friend) {
      throw new Error("Fill in the inputs");
    }

    client.sendEvent({
      type: "CHAT",
      data: { to: friend, name: me },
    });
  };

  const sendMessage = (me, friend, messageInput) => {
    if (!messageInput || !me || !friend) {
      throw new Error("Empty input!");
    }

    client.sendEvent({
      type: "MESSAGE",
      data: { to: friend, name: me, body: messageInput },
    });
  };

  var temp = [];
  const fetchData = () => {
    return temp;
  };
  const onEvent = (e) => {
    const { type } = e;

    switch (type) {
      case "CHAT": {
        // let msgArr = [];
        // for (let i = 0; i < e.data.messages.length; i++) {
        //   msgArr.push(e.data.messages[i].body);
        // }
        temp = [];
        temp = temp.concat(e.data.messages);
        // setMessages(() => [...e.data.messages]);
        setMessages((current) => {
          const newState = e.data.messages;
          // console.log(newState);
          return newState;
        });

        // console.log(messages);
        // console.log(e);
        // console.log(temp);
        break;
      }
      case "MESSAGE": {
        console.log(e);
        setMessages(() => messages.concat(e.data.message));
        break;
      }
      default:
        break;
      //     // renderMessages();
    }
  };
  // useEffect(() => {
  //   setMessages((msg) => {
  //     // console.log(msg);
  //     return msg;
  //   });
  // }, [messages]);

  // useEffect(() => {
  //   msgRef.current = messages;
  //   console.log(msgRef.current);
  // });
  return {
    startChat,
    messages,
    sendMessage,
    temp,
    fetchData,
    setMessages,
  };
};

export default useClient;
