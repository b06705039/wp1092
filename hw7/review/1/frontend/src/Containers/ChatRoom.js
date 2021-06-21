import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
import useClient from "../hooks/useClient";
import { useRef } from "react/cjs/react.development";
const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox(me, activeKey);
  const { sendMessage } = useChat();
  const [modalVisible, setModalVisible] = useState(false);
  const addChatBox = () => {
    setModalVisible(true);
  };
  const { messages, fetchData, setMessages, startChat } = useClient();
  const myRef = useRef();
  const otherRef = useRef();
  // useEffect(() => {
  //   function reRender() {
  //     startChat(myRef.current, me);
  //   }
  //   reRender();
  // }, [activeKey]);
  const aRef = async () => {
    await startChat(otherRef.current, me);
  };
  const reFet = async () => {
    console.log(myRef.current);
    await startChat(myRef.current, me);
  };
  useEffect(() => {}, [activeKey]);
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
            var other =
              key.split("_")[0] === me ? key.split("_")[1] : key.split("_")[0];
            myRef.current = other;
            reFet();
            console.log(messages);
            console.log(key);
            setActiveKey(key);
          }}
          onEdit={(targetKey, action) => {
            var myKey;
            if (action === "add") {
              addChatBox();
            } else if (action === "remove") {
              setActiveKey(() => {
                myKey = String(removeChatBox(targetKey, activeKey));
                console.log(typeof myKey);
                return myKey;
              });
              if (typeof myKey === "string") {
                var reg = new RegExp(me);
                var temp = myKey.split("_").join("");
                var temp2 = temp.replace(reg, "");
                otherRef.current = temp2;
                aRef();
              } else {
                try {
                  console.log(typeof myKey);
                  console.log("cry", activeKey);
                  var r = new RegExp(me);
                  var tem = myKey.split("_").join("");
                  var tem2 = tem.replace(r, "");
                  otherRef.current = tem2;
                  aRef();
                } catch (err) {
                  console.log(err);
                }
              }
            }
          }}
        >
          {chatBoxes.map(({ friend, key, chatLog }) => {
            return (
              <TabPane tab={friend} key={key} closable={true}>
                <p>{friend}'s chatbox.</p>
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {messages.length > 0
                    ? messages.map(({ name, body }, i) => {
                        return (
                          <li
                            key={i}
                            style={
                              name === me
                                ? { textAlign: "right" }
                                : { fontWeight: "bold" }
                            }
                          >
                            {name === me ? (
                              <p
                                style={{
                                  marginRight: "4px",
                                  background: "#EEE",
                                  color: "#818181",
                                  fontWeight: "normal",
                                  borderRadius: "10px",
                                  padding: "0.2em 0.8em",
                                  display: "inline-block",
                                  lineHeight: "1.8em",
                                  maxWidth: "100px",
                                  wordBreak: "break-all",
                                }}
                              >
                                {body}
                              </p>
                            ) : (
                              `${name} `
                            )}
                            <p
                              style={
                                name === me
                                  ? {
                                      display: "inline-block",
                                      fontWeight: "bold",
                                    }
                                  : {
                                      background: "#EEE",
                                      color: "#818181",
                                      display: "inline-block",
                                      fontWeight: "normal",
                                      borderRadius: "10px",
                                      padding: "0.2em 0.8em",
                                      maxWidth: "100px",
                                      wordBreak: "break-all",
                                    }
                              }
                            >
                              {name === me ? ` ${name} ` : `${body} `}
                            </p>
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name, me));
            setModalVisible(false);
            // console.log(chatBoxes);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
          me={me}
        />
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
            setMessageInput("");
            return;
          }
          sendMessage({ key: activeKey, body: msg, me: me });
          setMessageInput("");
          // client.sendMessage(me, chatBoxes[activeKey].friend, messageInput);
        }}
      ></Input.Search>
    </>
  );
};
export default ChatRoom;
