import '../App.css';
import { useState, useEffect } from 'react';
import { Tabs, Input, Badge, notification } from 'antd';

import webSocket from 'socket.io-client';
import ChatModal from './ChatModal';

const { TabPane } = Tabs;

function ChatRoom(props) {
    const me = props.me;
    const friends = props.friends;
    const displayStatus = props.displayStatus;
    const setFriends = props.setFriends;
    const [messageInput, setMessageInput] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState('');
    const [chatBoxes, setChatBoxes] = useState([]);
    const [ws, setWs] = useState(null);
    const [firstGetAll, setFirstGetAll] = useState(null);
    const [newChat, setNewChat] = useState(null);
    const [newMessage, setNewMessage] = useState(null);

    const MAX_MSG_LEN = 40;

    function connectWebSocket() {
        setWs(webSocket('http://localhost:8080'));
        setFirstGetAll(true);
    }

    function initConnectSocket() {
        ws.on('allChats', currAllMessages => {
            let newChatBoxes = [];
            for (let currMessage of currAllMessages) {
                const friend = currMessage.friend;
                if (friend === me) {
                    continue;
                }
                const chatLog = currMessage.messages;
                const key = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
                newChatBoxes.push({
                    friend: friend,
                    key: key,
                    chatLog: chatLog,
                    unread: 0
                })
            }
            setChatBoxes(newChatBoxes);
        });
        ws.on('chat', data => {
            setNewChat(data);
        });
        ws.on('message', data => {
            setNewMessage(data);
        });
    }

    function sendAllChat() {
        const allFriendsSet = new Set(friends);
        allFriendsSet.delete(me);
        const data = {
            name: me,
            friends: Array.from(allFriendsSet)
        }
        ws.emit('getAllChats', data);
    }

    function sendChat(friend) {
        const data = {
            name: me,
            to: friend
        };
        ws.emit('getChat', data);
    }

    function sendMessage(activeKey, msg) {
        let [name, to] = activeKey.split('_');
        if (to === me) {
            [name, to] = [to, name]
        }
        const data =  {
            name: name,
            to: to,
            body: msg
        }
        ws.emit('getMessage', data);
    }

    useEffect(() => {
        if (newChat) {
            let newChatBoxes = [...chatBoxes];
            for (let i = 0; i < chatBoxes.length; i++) {
                if (chatBoxes[i].key === activeKey) {
                    newChatBoxes[i].chatLog = newChat.messages;
                }
            }
            setChatBoxes(newChatBoxes);
        }
    }, [newChat]);

    useEffect(() => {
        if (newMessage) {
            let newChatBoxes = [...chatBoxes];
            for (let i = 0; i < chatBoxes.length; i++) {
                if (me === newMessage.name && chatBoxes[i].friend === newMessage.to) {
                    const newChatLog = [...newChatBoxes[i].chatLog, { name: newMessage.name, body: newMessage.body }];
                    newChatBoxes[i].chatLog = newChatLog;
                }
                else if (me === newMessage.to && chatBoxes[i].friend === newMessage.name) {
                    const newUnread = chatBoxes[i].unread + 1;
                    const newChatLog = [...newChatBoxes[i].chatLog, { name: newMessage.name, body: newMessage.body }];
                    newChatBoxes[i].unread = newUnread;
                    newChatBoxes[i].chatLog = newChatLog;
                    notification.open({
                        message: newMessage.name,
                        description: newMessage.body,
                        duration: 1
                    });
                }
            }
            setChatBoxes(newChatBoxes);
        }
    }, [newMessage]);

    useEffect(()=>{
        ws ? initConnectSocket() : connectWebSocket();
        if (firstGetAll) {
            sendAllChat();
            setFirstGetAll(false);
        }
        return () => {
            ws && ws.close();
        }
    }, [ws])

    useEffect(() => {
        let newFriends = new Set(friends);
        for (let i = 0; i < chatBoxes.length; i++) {
            newFriends.add(chatBoxes[i].friend);
        }
        setFriends(newFriends);
    }, [chatBoxes]);


    function createChatBox(friend) {
        if (!friend) {
            return;
        }
        if (friend === me) {
            displayStatus({
                type: 'error',
                msg: 'Don\'t talk to yourself you idiot'
            });
            return;
        }
        const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
            throw new Error(friend + "'s chat box has already been opened.");
        }

        const newChatBoxes = [...chatBoxes];
        newChatBoxes.push({ friend: friend, key: newKey, chatLog: [], unread: 0 });
        setChatBoxes(newChatBoxes);
        setActiveKey(newKey);
        sendChat(friend);
    }

    function removeChatBox(targetKey) {
        let lastIndex = -1;
        chatBoxes.forEach(({ key }, i) => {
            if (key === targetKey) {
                lastIndex = i - 1;
            }
        });

        let newActiveKey;
        const newChatBoxes = chatBoxes.filter((chatBox) => chatBox.key !== targetKey);
        if (newChatBoxes.length) {
            if (targetKey === activeKey) {
                if (lastIndex >= 0) {
                    newActiveKey = newChatBoxes[lastIndex].key; // previous one
                }
                else {
                    newActiveKey = newChatBoxes[0].key; // Two left. No previous one. Set to the next one
                }
            }
            else {
                newActiveKey = activeKey;
            }
        }
        else {
            newActiveKey = ''; // Nothing left
        }
        setChatBoxes(newChatBoxes);
        setActiveKey(newActiveKey);

        const [name, to] = targetKey.split('_');
        const friend = name === me ? to : name;
        let newFriends = new Set(friends);
        newFriends.delete(friend);
        setFriends(newFriends);
    }

    function trimMessage(message) {
        if (message.length > MAX_MSG_LEN - 3) {
            return message.slice(0, MAX_MSG_LEN - 3) + '...';
        }
        return message;
    }

    return (
        <>
            <ChatModal
                visible={ modalVisible }
                displayStatus={ displayStatus }
                onCreate={ ({ name }) => {
                    createChatBox(name);
                    setModalVisible(false);
                }}
                onCancel={() => {
                    setModalVisible(false);
                }}
             />
            <div className='App-title'>
                <h1>{me}'s Chat Room</h1>
            </div>
            <div className='App-messages'>
                <Tabs
                    type='editable-card'
                    activeKey={ activeKey }
                    onChange={ (key) => {
                        for (let i = 0; i < chatBoxes.length; i++) {
                            if (chatBoxes[i].key === activeKey) {
                                chatBoxes[i].unread = 0;
                            }
                        }
                        setActiveKey(key);
                    }}
                    onEdit={ (targetKey, action) => {
                        if (action === 'add') {
                            setModalVisible(true);
                        }
                        else if (action === 'remove') {
                            removeChatBox(targetKey);
                        }
                    }}
                >
                    {
                        chatBoxes.map(({ friend, key, chatLog, unread }) => {
                            return (
                                <TabPane
                                    tab={ <Badge count={unread} offset={[24, -2]} size="small">{friend}</Badge> }
                                    key={ key }
                                    closable={ true }
                                >
                                    {
                                        chatLog.map((message, index) => {
                                            return <div key={ key + index }>
                                                {
                                                    index === chatLog.length - unread && <div className="Unread">UNREAD</div>
                                                }
                                                <div key={ key + index } className={ message.name === me ? "Text-Box-Right" : "Text-Box-Left" }>
                                                    {
                                                        message.name !== me && <span className="Name-Box">{ message.name }</span>
                                                    }
                                                    <span className="Text">
                                                    {
                                                        trimMessage(message.body)
                                                    }
                                                    </span>
                                                    {
                                                        message.name === me && <span className="Name-Box">{ message.name }</span>
                                                    }
                                                </div>
                                            </div>
                                        })
                                    }
                                </TabPane> 
                            );
                        })
                    }
                </Tabs>
            </div>
            <Input.Search
                value={ messageInput }
                onChange={ (e) => setMessageInput(e.target.value) }
                enterButton='Send'
                placeholder='Enter message here...'
                onSearch={ msg => {
                    if (!msg) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter message.'
                        });
                        return;
                    }
                    else if (activeKey === '') {
                        displayStatus({
                            type: 'error',
                            msg: 'Please add a chatbox first.'
                        });
                        setMessageInput('');
                        return;
                    }
                    sendMessage(activeKey, msg);
                    setMessageInput('');
                }}
            >
            </Input.Search>
        </>
    );
};

export default ChatRoom;
