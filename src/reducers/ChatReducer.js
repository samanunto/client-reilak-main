import { types } from "../types/types";

const initialState = {
  chats: [],
  chatActivo: null,
  messages: [],
  miembros: [],
  conexion:null,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.chatAddNew:
      return {
        ...state,
        chats: [action.payload, ...state.chats,],
      };
    case types.activarChat:
      if (state.chatActivo === action.payload) return state;

      return {
        ...state,
        chatActivo: action.payload,
        messages: [],
      };

    case types.chatLoaded:
      return {
        ...state,
        chats: [...action.payload],
      };

    case types.MessageAddNew:
      if (state.chatActivo) {
        if (state.chatActivo.id === action.payload.to) {
          return {
            ...state,
            messages: [...state.messages, action.payload],
          }
        } else {
          return state
        }
      } else {
        return state
      }
    case types.messageLoaded:
      return {
        ...state,
        messages: [...action.payload],
      };
    case types.membersLoaded:
      return {
        ...state,
        miembros: [...action.payload],
      };
    case types.conexionLoaded:
      return {
        ...state,
        conexion: action.payload,
      };

    default:
      return state;
  }
};
