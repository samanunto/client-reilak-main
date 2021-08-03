import React, { useEffect } from "react";
import { createContext } from "react";
import { useSocket } from "../hooks/useSockets";
import { useDispatch, useSelector } from "react-redux";
import { notificacionLoaded } from "../actions/events";
import { activarChat, chatAddNew, conexionLoaded, MessageAddNew } from "../actions/chat";
import { scrollToBottomAnimate } from "../helpers/scrollToBottom";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    "http://localhost:4000"
  );
  const { logged } = useSelector((state) => state.auth);
  const { conexion } = useSelector((state) => state.chat);

  useEffect(() => {
    if (logged) {
      conectarSocket();
      console.log("existe uid");
    }
  }, [logged, conectarSocket]);

  useEffect(() => {
    if (!logged) {
      desconectarSocket();
      console.log("no existe uid");
    }
  }, [logged, desconectarSocket]);

  useEffect(() => {
    socket?.on("create-sala-chat", (mensaje) => {
      console.log(mensaje);
      dispatch(chatAddNew(mensaje));
      dispatch(activarChat(mensaje));
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("send-message", (message) => {
      console.log(message);
      dispatch(MessageAddNew(message));
      
    });
  }, [socket]);

  // useEffect(() => {
// socket?.on("send-activo", (activo)=>{

// if(conexion!==null){
//   for(let i=0;i<activo.length;i++){



//       if(conexion.usuario === activo[i].id){
//         console.log('es ', activo[i]);

//       }
//   }
// }
// })

  // }, [socket])

  // useEffect(() => {
  //   socket?.on('notificacion', (notificacion)=>{
  //     console.log('object')
  //     dispatch(notificacionLoaded(notificacion))
  //   })

  // }, [socket])

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
