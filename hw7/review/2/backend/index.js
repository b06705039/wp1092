const mongoose = require('mongoose');
const http = require('http');
const { Server } = require ("socket.io");
const express = require('express');
const path = require('path');
const uuid = require('uuid');
const dotenv = require('dotenv');

const mongo = require('./mongo');
const app = express();

/* -------------------------------------------------------------------------- */
/*                                                             MONGOOSE MODELS                                                            */
/* -------------------------------------------------------------------------- */
const { Schema } = mongoose;

dotenv.config();

const userSchema = new Schema({
    name: { type: String, required: true },
    chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
});

const messageSchema = new Schema({
    chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' },
    sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    body: { type: String, required: true },
});

const chatBoxSchema = new Schema({
    name: { type: String, required: true },
    users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});
const UserModel = mongoose.model('User', userSchema);
const ChatBoxModel = mongoose.model('ChatBox', chatBoxSchema);
const MessageModel = mongoose.model('Message', messageSchema);

/* -------------------------------------------------------------------------- */
/*                                                                    UTILITIES                                                                 */
/* -------------------------------------------------------------------------- */
const makeName = (name, to) => {
    return [name, to].sort().join('_');
};

/* -------------------------------------------------------------------------- */
/*                                                        SERVER INITIALIZATION                                                     */
/* -------------------------------------------------------------------------- */
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.use(express.static(path.join(__dirname, 'public')));

const validateUser = async (name) => {
    const existing = await UserModel.findOne({ name });
    if (existing) return existing;
    return new UserModel({ name }).save();
};

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box) box = await new ChatBoxModel({ name, users: participants }).save();
    return box
        .populate('users')
        .populate({ path: 'messages', populate: 'sender' })
        .execPopulate();
};

const chatBoxes = {}; // keep track of all open AND active chat boxes

io.on('connection', (client) => {
    client.on('getAllChats', async (message) => {

        const { name, friends } = message;

        let chatBoxes = [];

        for (let friend of friends) {
            const chatBoxName = makeName(name, friend);
            const sender = await validateUser(name);
            const receiver = await validateUser(friend);
            const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

            chatBoxes.push({ friend, chatBox });

        }
        client.emit('allChats', chatBoxes.map( chatBox => {
            return {
                friend: chatBox.friend,
                messages: chatBox.chatBox.messages.map(({ sender: { name }, body }) => ({
                    name,
                    body,
                })),
            }
        }));
    });

    client.on('getChat', async (message) => {
        const name = message.name;
        const friend = message.to;

        const chatBoxName = makeName(name, friend);
        const sender = await validateUser(name);
        const receiver = await validateUser(friend);
        const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

        client.emit('chat', {
            friend: friend,
            messages: chatBox.messages.map(({ sender: { name }, body }) => ({
                name,
                body,
            })),
        });
    });

    client.on('getChat', async (message) => {
        const name = message.name;
        const friend = message.to;

        const chatBoxName = makeName(name, friend);
        const sender = await validateUser(name);
        const receiver = await validateUser(friend);
        const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

        client.emit('chat', {
            friend: friend,
            messages: chatBox.messages.map(({ sender: { name }, body }) => ({
                name,
                body,
            })),
        });
    });

    client.on('getMessage', async (message) => {
        const { name, to, body } = message;

        const chatBoxName = makeName(name, to);

        const sender = await validateUser(name);
        const receiver = await validateUser(to);
        const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

        const newMessage = new MessageModel({ sender, body });
        await newMessage.save();

        chatBox.messages.push(newMessage);
        await chatBox.save();

        io.emit('message', {
            name,
            to,
            body,
        });
    });
});

mongo.connect();

server.listen(8080, () => {
    console.log('Server listening at http://localhost:8080');
});
