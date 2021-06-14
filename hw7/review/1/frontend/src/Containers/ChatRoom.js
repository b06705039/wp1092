import "../App.css";
import {useState} from "react";
import {Tabs, Input} from "antd";
import ChatModal from "./ChatModal";

const {TabPane} = Tabs;

const ChatRoom = ({me}) => {
    const [chatBoxes, setChatBoxes] = useState([
        {friend: "Mary", key: "MaryChatBox", chatLog: []},
        {friend: "Peter", key: "PeterChatBox", chatLog: []},
    ]);
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");

    const addChatBox = () => {
        setModalVisible(true);
    };

    const createChatBox = friend => {
        const newKey = `${friend}ChatBox`;
        if (chatBoxes.some(({key}) => key === newKey)){
            throw new Error(friend + "'s chat box has already opened.");
        } 
    
        const newChatBoxes = [...chatBoxes];
        const  chatLog = [];
        newChatBoxes.push({friend, key: newKey, chatLog});
        setChatBoxes(newChatBoxes);
        setActiveKey(newKey);
    };

    const removeChatBox = targetKey => {
        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(({key}, i) => {
            if (key === targetKey) lastIndex = i-1;
        });
        const newChatBoxes = chatBoxes.filter(chatBox => chatBox.key !== targetKey );
        if (newChatBoxes.length){
            if (newActiveKey === targetKey){
                if (lastIndex >= 0){
                    newActiveKey = newChatBoxes[lastIndex].key;
                }else newActiveKey = newChatBoxes[0].key;
            }
        }else newActiveKey = "";

        setChatBoxes(newChatBoxes);
        setActiveKey(newActiveKey);
    };

    return(
        <>
            <div className="App-title">
                <h1>{me}'s Chat Room</h1>
            </div>
            <div className="App-messages">
                <Tabs type="editable-card"
                      activeKey={activeKey}
                      onChange={key => setActiveKey(key)}
                      onEdit={(targetKey, action) => {
                          if (action === "add") addChatBox();
                          else if (action === "remove") removeChatBox(targetKey);
                      }}
                >
                    {chatBoxes.map(({friend, key, chatLog}) => {
                        return (
                            <TabPane tab={friend} key={key} closable={true}>
                                <p>{friend}'s chatBox.</p>
                            </TabPane>
                        )
                    })}
                    <ChatModal 
                        visible={modalVisible}
                        onCreate={({name}) => {
                            createChatBox(name);
                            setModalVisible(false);
                        }}
                        onCancel={()=>{
                            setModalVisible(false);
                        }}
                    />
                </Tabs>
            </div>
            <Input.Search
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            enterButton="Send"
            placeholder="Enter Message here..."
            onSearch={msg => setMessageInput("")}
            >
            </Input.Search>
        </>
    );
};

export default ChatRoom;