import './App.css';
import io from 'socket.io-client'
import {useState} from 'react'
import Chat from './Chat.js'
const socket = io.connect("http://localhost:3001");


function App() {

  const[uname,setUname]=useState("");
  const[chat,setChat]=useState("");

  const joinChat = () => {
    if(uname !== "" && chat !== ""){
      socket.emit("join_Chat",chat);
    }
  };

  return (
    <div className="App">
        <h3>Join Chat</h3>
        <input type='text' placeholder='Name' onChange={(event)=>{setUname(event.target.value)}}/>
        <input type='text' placeholder='Chat ID' onChange={(event)=>{setChat(event.target.value)}}/>
        <button onClick={joinChat}> Join a Chat </button>

      <Chat socket={socket} uname={uname} chatID={chat}/>
    </div>
  );
}

export default App;
