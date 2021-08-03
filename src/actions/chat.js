import { fetchConToken, fetchConAxios } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";



/************************************
 CREAR CHAT
**************************************/

export  const chatAddNew = (chat) => ({
    type: types.chatAddNew,
    payload: chat,
  });


/************************************
 LISTAR chats
**************************************/
export const chatStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("chat");
      const body = await resp.json();
      const chats = body.chat;
      dispatch(chatLoaded(chats));
    } catch (error) {
      console.log(error);
    }
  };
};

const chatLoaded = (chats) => ({
  type: types.chatLoaded,
  payload: chats,
});

/************************
 activar chat
 *********************/
export const activarChat = (chats)=>({
  type: types.activarChat,
  payload: chats,
})


/**********************
 *SEND MESSAGE
 ********************/
export const MessageAddNew = (message)=>({
  type: types.MessageAddNew,
  payload: message,
})

/************************************
 LISTAR MESSAGES
**************************************/
export const messageStartLoading = (chat) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`chat/message/${ chat }`);
      const body = await resp.json();
      console.log(body)
      const chats = body.message;
      dispatch(messageLoaded(chats));
    } catch (error) {
      console.log(error);
    }
  };
};

const messageLoaded = (chats) => ({
  type: types.messageLoaded,
  payload: chats.reverse(),
});


/******
 listar miembros
 */

 export const chatStartMembers = (chat) =>{
 
   return async (dispatch)=>{
    try {
      const resp = await fetchConToken(`chat/miembros/${ chat }`);
      const body = await resp.json();
    
      const miembros = body.miembros;
      dispatch(membersLoaded(miembros));
    } catch (error) {
      console.log(error);
    }
   }
 }
 const membersLoaded = (miembros)=>({
  type: types.membersLoaded,
  payload: miembros,
 })


 /************ultima conexion************* */

 export const conexionStartLoading = (chat)=>{
  console.log('frontedn conex',chat)
  return async (dispatch)=>{
   try {
     const resp = await fetchConToken(`conexion/user/${ chat }`);
     const body = await resp.json();
     console.log(body.conexion)
     const conexion = body.conexion;
     dispatch(conexionLoaded(conexion));
   } catch (error) {
     console.log(error);
   }
  }
}
export const conexionLoaded = (conexion)=>({
 type: types.conexionLoaded,
 payload: conexion,
})