import './App.css';
import io from 'socket.io-client'
import {useState} from 'react'
import Chat from './Chat.js'
const socket = io.connect("http://localhost:3001");


function App() {

  const[uname,setUname]=useState("");
  const[chat,setChat]=useState("");
  const[showChat,setShowChat]=useState(false);

  const joinChat = () => {
    if(uname !== "" && chat !== ""){
      socket.emit("join_Chat",chat);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat? (
      <div className='joinChatContainer'>
        <h3>Join Chat</h3>
        <input type='text' placeholder='Name' onChange={(event)=>{setUname(event.target.value)}}/>
        <input type='text' placeholder='Chat ID' onChange={(event)=>{setChat(event.target.value)}}/>
        <button onClick={joinChat}> Join a Chat </button>
      </div>
      ):(
      <Chat socket={socket} uname={uname} chatID={chat}/>
      )}
    </div>
  );
}

export default App;
