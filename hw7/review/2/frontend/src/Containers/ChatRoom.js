import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input, Tag } from "antd";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, setChatBoxes, createChatBox, removeChatBox } = useChatBox();
  const { status, sendMessage, sendChat } = useChat(me, chatBoxes, setChatBoxes);
  const [modalVisible, setModalVisible] = useState(false);
  
  const addChatBox = () => { setModalVisible(true); };

  useEffect(() => {
    displayStatus(status)
  }, [status]);
  
  return (
    <>
      {" "}
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>{" "}
      </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove")
              setActiveKey(removeChatBox(targetKey, activeKey));
          }}  
        >
          {chatBoxes.map(({ friend, key }) => {
            return (
              <TabPane
                tab={friend}
                key={key}
                closable={true}
              ></TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name, me, sendChat));
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
        {chatBoxes.filter(x => x.key === activeKey).map(chatBox => (
            chatBox.chatLog.map(({ name, body }, i) => {
                let style = { position: "relative", fontSize: "16px" }
                if (name === me) {
                    style.textAlign = 'right'
                    return (
                      // [Message] [name]
                      <p className="App-message" key={i} style={style}>
                          <Tag color="#DCDCDC" style={{ fontSize: "16px", color: "#696969" }}>{body}</Tag> {name}
                      </p>
                    )
                }
                else {
                    style.textAlign = 'left'
                    return (
                      // [name] [Message]
                      <p className="App-message" key={i} style={style}>
                          {name} <Tag color="#DCDCDC" style={{ fontSize: "16px", color: "#696969" }}>{body}</Tag> 
                      </p>
                    )
                }
            })
        ))}
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Enter message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter message.",
            });
            return;
          } else if (activeKey === "") {
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first.",
            });
            return;
          }
          const p1 = activeKey.split('_')[0];
          const p2 = activeKey.split('_')[1];
          const to = p1 === me ? p2 : p1;
          sendMessage({ name: me, to, body: msg })
          setMessageInput("");
        }}
      ></Input.Search>
    </>
  );
};

export default ChatRoom;
