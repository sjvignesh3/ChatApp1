import React from 'react'
import {useState,useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({socket,uname,chatID}) {

    const[msg,setMsg] = useState("");
    const[msgList,setMsgList] = useState([]);

    const sendMsg = async () => {
        if(msg !== ""){
            const metaMsg = {
                chat : chatID,
                author : uname,
                msg1 : msg,
                time : new Date(Date.now()).getHours() + "-" + new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_msg",metaMsg);
            setMsgList((list) => [...list, metaMsg]);
            setMsg("");
        }
    };
    useEffect(() => {
        socket.on("receive_msg",(data)=>{
            setMsgList((list) => [...list,data]);
        });
    },[socket]);
    
  return (
    <div className='chat-window'>
        <div className="chat-header">
            <p>LIVE CHAT</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className='message-container'>
            {msgList.map((msgcon) => {
                return (
                    <div className='message' id={uname===msgcon.author?"other":"you"}>
                        <div>
                            <div className='message-content'>
                                <p>{msgcon.msg1}</p>
                            </div>
                            <div className='message-meta'>
                                <p id="time">{msgcon.time}</p>
                                <p id="author">{msgcon.author}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input type='text' value={msg} placeholder='Hey...' onChange={(event) => {setMsg(event.target.value)}} onKeyDown={(event)=>{event.key==="Enter" && sendMsg();}}></input>
            <button onClick={sendMsg}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat;