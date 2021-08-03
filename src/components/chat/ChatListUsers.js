import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activarChat, chatStartLoading, conexionStartLoading, messageStartLoading } from "../../actions/chat";
import { infoChatClosed, infoChatOpen } from "../../actions/ui";
import { scrollToBottom } from "../../helpers/scrollToBottom";


export const ChatListUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chatStartLoading());
    
  }, [dispatch]);

  const {chats} = useSelector(state => state.chat);
  const {uid} = useSelector(state => state.auth)
  const handleActivarChat = (id)=>{
    dispatch(activarChat(id))
    dispatch(messageStartLoading(id.id));
    for(let i=0;i<id.members.length;i++){
      if(id.members[i]!==uid){
        dispatch(conexionStartLoading(id.members[i]));
        dispatch(infoChatClosed());
      }
    }
    
    
  }



  return (
    <div className="chat__left-list">
      {chats.map((chats,i)=>(
              <div className="chat__left-list-item" onClick={()=>{handleActivarChat(chats)}}>
              <div className="chat__left-list-item-photo">
                <img src={chats.img?chats.img:chats.user[0].imgusuario} />
              </div>
              <div className="chat__left-list-item-info">
                <div className="chat__left-list-item-info-nombre">
                  {chats.name?chats.name:chats.user[0].name} {chats.tipo==="personal" &&chats.user?chats.user[0].apellidoPaterno:''}
                </div>
                <div className="chat__left-list-item-info-last-message">
                  Hey, how are you... <span>12:45</span>
                </div>
              </div>
            </div>
      ))

      }
    </div>

  );
};
  