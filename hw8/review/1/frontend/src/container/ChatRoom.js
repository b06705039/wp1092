import "../App.css";
import React, { useState, useEffect } from "react";
import { Tabs, Input, Typography } from "antd";
import ChatModal from "./ChatModal";
import useChatBox from "../hook/useChatBox";
import useChat from "../hook/useChat";
import useServer from "../server_test";
import { useQuery } from "@apollo/client";
import { GET_CHATBOX, SUBSCRIBE } from "../grapql";
const { Paragraph } = Typography;
const { TabPane } = Tabs;
const ChatRoom = ({ me }) => {
  const [messages, setMessage] = useState([]);
  const { subscribeToMore } = useQuery(GET_CHATBOX);
  const [activeKey, setActiveKey] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const addChatBox = () => {
    setModalVisible(true);
  };
  const { startChat, SendMessage } = useServer(messages, setMessage);
  const { chatBoxes, setChatBoxes, createChatBox, removeChatBox } = useChatBox(
    me,
    activeKey,
    setActiveKey,
    startChat,
    setMessage
  );
  const { status, setStatus, sendMessage } = useChat(me, SendMessage);
  useEffect(() => {
    var elements = document.getElementsByClassName("MyTab");
    for (let i = 0; i < elements.length; i++)
      elements[i].scrollTop = elements[i].scrollHeight;
  }, [messages]);
  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const msg = subscriptionData.data.newMessage;
        let msgkey = [msg.to, msg.sender].sort().join("_");
        if (activeKey === msgkey)
          setMessage((msgs) => {
            if (activeKey === msgkey)
              return [...msgs, { body: msg.body, name: msg.sender }];
            else return [...msgs];
          });
        else if (activeKey.length > 0 && activeKey !== msgkey)
          setChatBoxes((boxes) => {
            return boxes.map((box) => {
              if (box.key === msgkey) box.chat += 1;
              return box;
            });
          });
      },
    });
  }, [subscribeToMore, activeKey, setChatBoxes]);
  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      {" "}
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>{" "}
      </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => {
            let users = key.split("_");
            startChat(me, me === users[1] ? users[0] : users[1]);
            setChatBoxes((boxes) =>
              boxes.map((box) => {
                if (box.key === key) box.chat = 0;
                return box;
              })
            );
            setActiveKey(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") {
              addChatBox();
            } else if (action === "remove") removeChatBox(targetKey);
          }}
        >
          {chatBoxes.map(({ friend, key, chat }) => {
            return (
              <TabPane
                tab={
                  `${friend}` +
                  (chat > 0 ? ` [${parseInt((chat + 1) / 2)}]` : "")
                }
                key={key}
                closable={true}
                className="MyTab"
                style={{ overflow: "auto", height: 500 }}
              >
                <p>{friend}'s chatbox.</p>
                {messages.map((msg, index) => (
                  <Paragraph
                    key={index}
                    className={"chat " + (me === msg.name ? "right" : "left")}
                  >
                    {(me === msg.name ? "" : `${msg.name}: `) + msg.body}
                  </Paragraph>
                ))}
              </TabPane>
            );
          })}
        </Tabs>
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Enter message here..."
        onSearch={(msg) => {
          if (!msg) {
            setStatus({
              type: "Error",
              msg: "Please enter message.",
            });
            return;
          } else if (activeKey === "") {
            setStatus({
              type: "Error",
              msg: "Please add a chatbox first.",
            });
            setMessageInput("");
            return;
          }
          sendMessage({ key: activeKey, body: msg });
          setMessageInput("");
        }}
      ></Input.Search>
      {status.type ? (
        <h4 style={{ color: "red" }}>{`[${status.type}] ${status.msg}`}</h4>
      ) : (
        <></>
      )}
      <ChatModal
        visible={modalVisible}
        onCreate={({ name }) => {
          createChatBox(name);
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
    </div>
  );
};
export default ChatRoom;
