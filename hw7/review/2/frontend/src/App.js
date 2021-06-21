import './App.css';
import { useState, useEffect } from 'react';
import SignIn from './container/SignIn';
import ChatRoom from './container/ChatRoom';

import { message } from 'antd';

const LOCALSTORAGE_ME_KEY = "save-me";
const LOCALSTORAGE_FRIENDS_KEY = "save-friends";

function App() {
    const savedMe = localStorage.getItem(LOCALSTORAGE_ME_KEY); 
    const savedFriends = localStorage.getItem(LOCALSTORAGE_FRIENDS_KEY);
    const [signedIn, setSignedIn] = useState(false);
    const [me, setMe] = useState(savedMe || '');
    const [friends, setFriends] = useState(savedFriends ? new Set(JSON.parse(savedFriends)) : new Set());
    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_ME_KEY, me);
        }
    }, [signedIn]);

    useEffect(() => {
        localStorage.setItem(LOCALSTORAGE_FRIENDS_KEY, JSON.stringify(Array.from(friends)));
    }, [signedIn, friends]);

    function displayStatus(data) {
        const { type, msg } = data;
        const content = {
            content: msg,
            duration: 0.5
        };
        if (type === 'success') {
            message.success(content);
        }
        else {
            message.error(content);
        }
    }

	return (
		<div className="App">
            { signedIn ? (<ChatRoom me={ me } displayStatus={ displayStatus } friends={ friends } setFriends={ setFriends }/>) : (<SignIn me={ me } setMe={ setMe } setSignedIn={ setSignedIn } displayStatus={ displayStatus } />) }
		</div>
	);
}

export default App;
