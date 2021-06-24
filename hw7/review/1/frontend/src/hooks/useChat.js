import { useState, useEffect } from "react";

const useChat = (me, client, activeKey) => {
    const [chatBoxes, setChatBoxes] = useState([]);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (activeKey) {
            const sender = activeKey.split('_')[0] === me ? activeKey.split('_')[0] : activeKey.split('_')[1];
            const receiver = activeKey.split('_')[0] === me ? activeKey.split('_')[1] : activeKey.split('_')[0];
            client.send(JSON.stringify({
                type: 'CHAT',
                data: { to: receiver, name: sender },
            }));
        }
    }, [activeKey]);
    client.onmessage = (m) => {
        const { data } = m;
        console.log(JSON.parse(data));
        const payload = JSON.parse(data);
        switch (payload.type) {
            case 'CHAT': {
                setMessages(payload.data.messages);
                break;
            }
            case 'MESSAGE': {
                setMessages(messages => [...messages, payload.data.message]);
                break;
            }
            default: break;
        }
    }
    const createChatBox = (friend, activeKey) => {
        const newKey = me <= friend ?
            `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
            throw new Error(friend +
                "'s chat box has already opened.");
        }
        const newChatBoxes = [...chatBoxes];
        const chatLog = [];
        newChatBoxes.push({ friend, key: newKey, chatLog });
        setChatBoxes(newChatBoxes);
        //setActiveKey(newKey);
        console.log(newKey);
        return newKey;
    };

    const removeChatBox = (targetKey, activeKey) => {
        //console.log(targetKey);
        //console.log(activeKey);

        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(({ key }, i) => {
            if (key === targetKey) { lastIndex = i - 1; }
        });
        const newChatBoxes = chatBoxes.filter(
            (chatBox) => chatBox.key !== targetKey);
        if (newChatBoxes.length) {
            if (newActiveKey === targetKey) {
                if (lastIndex >= 0) {
                    newActiveKey = newChatBoxes[lastIndex].key;
                } else { newActiveKey = newChatBoxes[0].key; }
            }
        } else newActiveKey = ""; // No chatBox left

        setChatBoxes(newChatBoxes);

        //setActiveKey(newActiveKey);
        if (targetKey !== '') {
            const sender = targetKey.split('_')[0] === me ? targetKey.split('_')[0] : targetKey.split('_')[1];
            const receiver = targetKey.split('_')[0] === me ? targetKey.split('_')[1] : targetKey.split('_')[0];
            let newactive = newActiveKey;
            if (newactive !== "") {
                newactive = newactive.split('_')[0] === me ? newactive.split('_')[1] : newactive.split('_')[0];
            }
            console.log(newactive);
            /*client.send(JSON.stringify({
                type: 'REMOVE',
                data: { to: receiver, name: sender, newactive: newactive },
            }));*/
            if (newactive === "") {
                setMessages([]);
            }
        }
        console.log(newActiveKey);
        return newActiveKey;
    };

    const sendMessage = (payload) => {
        console.log(payload);
        const sender = payload.key.split('_')[0] === me ? payload.key.split('_')[0] : payload.key.split('_')[1];
        const receiver = payload.key.split('_')[0] === me ? payload.key.split('_')[1] : payload.key.split('_')[0];
        client.send(JSON.stringify({
            type: 'MESSAGE',
            data: { name: sender, to: receiver, body: payload.body },
        }));
    }; // { key, msg }

    return { createChatBox, removeChatBox, sendMessage, chatBoxes, messages };
};

export default useChat
