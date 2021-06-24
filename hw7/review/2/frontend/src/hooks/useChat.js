import { useState, useEffect } from "react";
import { message } from 'antd';
import webSocket from 'socket.io-client';

function useChat(me) {
    const [currMessages, setCurrMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({ name: '', body: '' });
    const [currAllMessages, setCurrAllMessages] = useState([]);
    const [ws, setWs] = useState(null);

    function connectWebSocket() {
        setWs(webSocket('http://localhost:8080'));
    }

    function initConnectSocket() {
    }

    useEffect(()=>{
        ws ? initConnectSocket() : connectWebSocket();
        return () => {
            ws && ws.close();
        }
    }, [ws])


    function sendChat() {

    }

    function sendMessage() {

    }

    function sendAllChat(name, friends) {
        const allFriendsSet = new Set(friends);
        allFriendsSet.delete(me);
        const data = {
            name: name,
            friends: Array.from(allFriendsSet)
        }
        ws.emit('getAllChats', data);
    }

    /*
    ws.onopen = () => {
        console.log('connection established');
    }

    ws.onmessage = (result) => {
        const data = JSON.parse(result.data);
        const { type } = data;
        switch (type) {
            case 'CHAT':
                const messages = data.data.messages;
                setCurrMessages(messages);
                break;
            case 'MESSAGE':
                const newNewMessage = data.data.message;
                setNewMessage(newNewMessage);
                break;
            case 'ALL_CHAT':
                const allMessages = data.data;
                setCurrAllMessages(allMessages);
                break;
            default:
                break;
        }
    }

    ws.onopen = () => {
        console.log('connection closed');
    }

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function sendMessage(activeKey, msg) {

        let [name, to] = activeKey.split('_');
        if (to === me) {
            [name, to] = [to, name]
        }
        const data = {
            type: 'MESSAGE',
            data: {
                name: name,
                to: to,
                body: msg
            }
        }
        while (ws.readyState === 0) {
            await sleep(200);
        }
        ws.send(JSON.stringify(data));
    }

    async function sendChat(name, to) {
        const data = {
            type: 'CHAT',
            data: {
                name: name,
                to: to
            }
        }
        const load = message.loading('Retrieving messages...', 0);
        while (ws.readyState === 0) {
            await sleep(200);
        }
        setTimeout(load, 0);

        ws.send(JSON.stringify(data));
    }

    async function sendAllChat(name, friends) {
        const allFriendsSet = new Set(friends);
        allFriendsSet.delete(me);
        
        const data = {
            type: 'ALL_CHAT',
            data: {
                name: name,
                friends: Array.from(allFriendsSet)
            }
        }
        const load = message.loading('Retrieving messages...', 0);
        while (ws.readyState === 0) {
            await sleep(200);
        }
        setTimeout(load, 0);

        ws.send(JSON.stringify(data));
    }
    */

    return { currMessages, newMessage, currAllMessages, sendChat, sendMessage, sendAllChat };
}

export default useChat;
