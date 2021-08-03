import React, { createRef, useContext, useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { SocketContext } from "../../context/SocketContext";
import { useSelector } from "react-redux";
import { fetchConToken, fetchConAxios } from "../../helpers/fetch";

const initImg = {
  img: "",
};
const fileName = {
  nameFile: "",
};
export const ChatSendMesagge = () => {
  const inputRef=createRef();
  const { socket } = useContext(SocketContext);
  const [chosenEmoji, setChosenEmoji] = useState();
  const [message, setMessage] = useState("");

  const { chatActivo } = useSelector((state) => state.chat);
  const { uid } = useSelector((state) => state.auth);

  /***********************************************************
SUBIDA DE ARCHIVOS
**********************************************************/
  const [formValues, setFormValues] = useState(initImg);
  const [nameImg, setNameImg] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const imageHandleChange = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (selectedFile) {
      console.log(selectedFile.name);
      formValues.img = selectedFile;
      console.log(selectedFile);
      setNameImg(true)
    }
  }, [selectedFile]);

  fileName.nameFile = selectedFile.name;


  /************************************* */
  const cancelFile = (e) => {
    setSelectedFile("");
e.target="";
  };
  const handleShowEmojis = () => {
    inputRef.current.focus();
    // setChosenEmoji(emojiObject);
  };

  const HandleOnChange = ({ target }) => {
   
    setMessage(target.value);
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (formValues.img) {
      const formData = new FormData();
      formData.set("img", formValues.img);
      try {
        const resp = await fetchConAxios("multimedias", formData, "POST");
        const body = await JSON.stringify(resp.data.multimedia);
        console.log("body", body);      
        const img = body.replace(/['"]+/g, "");
        socket.emit("send-message", {
          from: uid,
          to: chatActivo.id,
          message: img,
          viewedby: [uid],
        });

        setMessage(null);
        e.target.files = null;
        initImg.img="";
        fileName.nameFile="";
        setNameImg(false)
        return
      } catch (error) {
        console.log(error);
      }
      
    }
      if (message.length === 0) {
        console.log(message);
        console.log("llergo");
        return;
      }
      socket.emit("send-message", {
        from: uid,
        to: chatActivo.id,
        message,
        viewedby: [uid],
      });
      setMessage('');
      e.target.files = null;
      fileName.nameFile="";
      setNameImg(false)
    


  };

  return (
    <>
      {(nameImg) && (
        <div className="sendMessage__files">
          <span>Multimedia: {fileName.nameFile}   <i onClick={cancelFile} class="fa fa-times"></i></span>
          
        </div>
      )}
      <form className="chat__SendMessage" onSubmit={handleSendMessage}>
        <div className="chat__SendMessage-left">
          <div className="chat__SendMessage-left-icon">
            <i class="far fa-grin"></i> 
             {/* {chosenEmoji ? (
        <span>You chose: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )} */}
             {/* <Picker onEmojiClick={onEmojiClick} />  */}
          </div>
          <div className="chat__SendMessage-left-icon">
            <input
              type="file"
              id="upload"
              hidden
              onChange={imageHandleChange}
              accept=".img,.png,.mp4,.jpg,.jepg,.gif"
            />
            <label for="upload">
              <i class="fas fa-photo-video"></i>
            </label>
          </div>
        </div>
        <div className="chat__SendMessage-right">
          <input
            onKeyPress="submit"
            className="chat__SendMessage-right-input"
            type="text"
            placeholder=" Escribe un mensaje"
            value={message}
            onChange={HandleOnChange}
            ref={inputRef}
          ></input>
        </div>
      </form>
    </>
  );
};
