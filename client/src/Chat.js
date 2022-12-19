import React from 'react'
import {useState,useEffect} from 'react'

function Chat({socket,uname,chatID}) {

    const[msg,setMsg] = useState("");

    const sendMsg = async () => {
        if(msg !== ""){
            const metaMsg = {
                chat : chatID,
                author : uname,
                msg : msg,
                time : new Date(Date.now()).getHours() + "-" + new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_msg",metaMsg);
        }
    }
    useEffect(() => {
        socket.on("receive_msg",(data)=>{
            console.log(data);
        })
    },[socket]);
    
  return (
    <div>
        <div className="chat-header">
            <p>LIVE CHAT</p>
        </div>
        <div className="chat-body"> </div>
        <div className="chat-footer">
            <input type='text' placeholder='Hey...' onChange={(event) => {setMsg(event.target.value)}}></input>
            <button onClick={sendMsg}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat