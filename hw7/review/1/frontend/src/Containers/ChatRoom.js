import "../App.css";
import { useEffect, useState, useRef } from "react";
import { Tabs, Input } from "antd";
import ChatModal from './ChatModal';
import useChat from '../hooks/useChat'
import Message from "./Message";
const { TabPane } = Tabs;

const client = new WebSocket('ws://localhost:8080');

const ChatRoom = ({ me, displayStatus }) => {

    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("")
    const addChatBox = () => { setModalVisible(true); };
    const { createChatBox, removeChatBox, sendMessage, chatBoxes, messages } = useChat(me, client, activeKey);
    const messageRef = useRef([]);
    const scrollToBottom = (idx) => {
        messageRef.current[idx].scrollIntoView(
            {
                behavior: "smooth",
                block: 'end',
                inline: 'nearest'
            })
    }
    useEffect(() => {
        messageRef.current = messageRef.current.slice(0, chatBoxes.length);
        if(chatBoxes.length){
            var index = chatBoxes.map((o) => o.key).indexOf(activeKey);
            if(messageRef.current[index]){
                scrollToBottom(index);
            }
        }
    }, [messages, chatBoxes, activeKey]);
    //const { status, sendMessage } = useChat(me);
    return (
        <>
            <div className="App-title">
                <h1>{me}'s Chat Room</h1>
            </div>
            <div className="App-messages">
                <div>
                    <Tabs
                        type="editable-card"
                        activeKey={activeKey}
                        onChange={(key) => { setActiveKey(key); }}
                        onEdit={(targetKey, action) => {
                            if (action === "add") addChatBox();
                            else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
                        }}>
                        {chatBoxes.map((
                            { friend, key, chatLog }, i) => {
                            return (
                                <TabPane tab={friend}
                                    key={key} closable={true}>
                                    <p>{friend}'s chatbox.</p>
                                    <div style={{ overflow: "auto", height: "180px" }}>
                                        {activeKey === "" ? <></> : messages.length === 0 ? (
                                            <p style={{ color: '#ccc' }}> No messages... </p>) :
                                            (messages.map(({ name, body }, i) => (
                                                <Message key={i} name={name} me={me} body={body} />
                                            )))}
                                        <div ref={e => messageRef.current[i] = e} />
                                    </div>
                                </TabPane>
                            );
                        })}
                    </Tabs>
                </div>
                <ChatModal
                    visible={modalVisible}
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name, activeKey));
                        setModalVisible(false);
                    }}
                    onCancel={() => {
                        setModalVisible(false);
                    }}
                />

            </div>
            <Input.Search
                value={messageInput}
                onChange={(e) =>
                    setMessageInput(e.target.value)}
                enterButton="Send"
                placeholder=
                "Enter message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: "error",
                            msg: "Please enter message.",
                        });
                        return;
                    }
                    else if (activeKey === "") {
                        displayStatus({
                            type: "error",
                            msg: "Please add a chatbox first.",
                        });
                        setMessageInput("");
                        return;
                    }
                    else {
                        displayStatus({
                            type: "success",
                            msg: "Message sent.",
                        });
                    }
                    sendMessage({ key: activeKey, body: msg });
                    setMessageInput("");
                }}
            ></Input.Search>
        </>);
};
export default ChatRoom;
