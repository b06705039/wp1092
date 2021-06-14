import './App.css';
import {useState, useEffect} from "react";
import SignIn from "./Containers/SignIn";
import ChatRoom from "./Containers/ChatRoom";

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState("");

  return(
    <div className="App">
      {signedIn ? <ChatRoom me={me}/> : <SignIn me={me} setMe={setMe} setSignedIn={setSignedIn}/>}
    </div>
  )
};

export default App;
