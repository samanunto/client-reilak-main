import React, { useEffect, useState } from "react";
import { ChatListUsers } from "./ChatListUsers";
import { ChatSearch } from "./ChatSearch";
import { ChatHeardLeft } from "./ChatHeardLeft";
import { ChatHeardRight } from "./ChatHeardRight";
import { ChatHistory } from "./ChatHistory";
import { ChatSendMesagge } from "./ChatSendMessage";
import { ChatInfo } from "./ChatInfo";
import { useDispatch, useSelector } from "react-redux";
import { messageStartLoading } from "../../actions/chat";

export const ChatScreen = () => {
  // const [chatInfo, setChatinfo] = useState(true)

  const dispatch = useDispatch();
  const { chatActivo } = useSelector((state) => state.chat);


  const { infoChat } = useSelector((state) => state.infoChat);
  // console.log(infoChat)
  return (
    <div className="main__home">
      <div className="chat__left">
        <ChatHeardLeft />
        <ChatSearch />
        <ChatListUsers />
      </div>
      {chatActivo ? (
        <div className="chat__right">
          <ChatHeardRight />
          <ChatHistory />
          <ChatSendMesagge />
        </div>
      ) : (
        <div className="chat__right">
          <div className="chat__right-noactive">Seleccione un chat</div>
          <p>Para comenzar una conversación</p>
        </div>
      )}
      <div>{infoChat && <ChatInfo />}</div>
    </div>
  );
};
