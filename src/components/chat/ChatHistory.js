import React, { useCallback, useEffect, useRef, useState } from "react";

import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { messageStartLoading } from "../../actions/chat";
import moment from "moment";
import { scrollToBottom } from "../../helpers/scrollToBottom";

export const ChatHistory = () => {
const dispatch = useDispatch();

const messagesEndRef = useRef(null);
const scrollToBottom = ()=>{
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}


  const {messages} = useSelector(state => state.chat);
  const {uid} = useSelector(state => state.auth);

  useEffect(() => {
    scrollToBottom();
    
    }, [messages])
    scrollToBottom();
  return (
    <div className="chat__history" id="messages">

     { messages.map((messages,i)=>(
       (messages.from === uid)?
       <div className="chat__message-right" key={i}>
       <div className="chat__message-info-right">
         <div className="chat__message-info-name"></div>
         <div className="chat__message-info-content">{messages.message.substr(-3)==="png" ||messages.message.substr(-3)==="jpg"||messages.message.substr(-3)==="jpge"||messages.message.substr(-3)==="gif"?<img src={messages.message}/>:messages.message.substr(-3)==="mp4"?<ReactPlayer
                      url={messages.message}
                      width="100%"
                      height="100%"
                      controls={true}
                      pip={true}
                      volume="0.8"
                      light="true"
                    />:messages.message}</div>
         <div className="chat__message-info-time">{moment(messages.fecha).format(" h:mm a, DD-MM")}</div>
         
       </div>
       <div ref={messagesEndRef} />
       
     </div>
     :
<div className="chat__message-left" key={i}>
       <div className="chat__message-photo">
         <img src={messages.imgusuario} />
       </div>
       <div className="chat__message-info-left">
         <div className="chat__message-info-name">{messages.name} {messages.segundoNombre} {messages.apellidoPaterno} {messages.apellidoMaterno}</div>
         <div className="chat__message-info-content">{messages.message.substr(-3)==="png" ||messages.message.substr(-3)==="jpg"||messages.message.substr(-3)==="jpge"||messages.message.substr(-3)==="gif"?<img src={messages.message}/>:messages.message.substr(-3)==="mp4"?<ReactPlayer
                      url={messages.message}
                      width="100%"
                      height="100%"
                      controls={true}
                      pip={true}
                      volume="0.8"
                      light="true"
                    />:messages.message}</div>
         <div className="chat__message-info-time">{moment(messages.fecha).format("h:mm a, DD-MM")}</div>
       </div>
       <div ref={messagesEndRef} />
       
     </div>

      ))}

<div class="loader__message-file"></div>


    </div>

    
    
  );
};
