import React from "react";
import { ChatSearch } from "./ChatSearch";
import { infoChatClosed, infoChatOpen } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export const ChatHeardRight = () => {
  const dispatch = useDispatch();

  const { infoChat } = useSelector((state) => state.infoChat);
  const { chatActivo } = useSelector((state) => state.chat);
  const {conexion} = useSelector(state => state.chat)
  let lastConexionChatActivo = "";
if(conexion!==null){

  lastConexionChatActivo= (moment(Date.now()).from(conexion.fechatermino, 'minutes'))
}


  const hanleOpenInfoChat = () => {
    if (!infoChat) {
      dispatch(infoChatOpen());
      console.log("se abrio");
    } else {
      dispatch(infoChatClosed());
      console.log("se cerro");
    }
  };

  return (
    <>
      {chatActivo && (
        <div className="chat__right-heard">
          <div className="chat__right-heard-left">
            <div className="chat__right-heard-left-photo">
              <img
                src={
                  chatActivo.img
                    ? chatActivo.img
                    : chatActivo.user
                    ? chatActivo.user[0].imgusuario
                    : chatActivo.imgusuario
                }
              />
            </div>
            <div className="chat__right-heard-left-info">
              {chatActivo.tipo==="personal"?
              <div className="chat__right-list-item-info-nombre">
                {chatActivo.name ? chatActivo.name : chatActivo.user[0].name}{" "}
                {chatActivo.segundoNombre
                  ? chatActivo.segundoNombre
                  : chatActivo.user[0]
                  ? chatActivo.user[0].segundoNombre
                  : ""}{" "}
                {chatActivo.segundoNombre
                  ? chatActivo.apellidoPaterno
                  : chatActivo.user[0]
                  ? chatActivo.user[0].apellidoPaterno
                  : ""}{" "}
                {chatActivo.apellidoMaterno
                  ? chatActivo.apellidoMaterno
                  : chatActivo.user[0]
                  ? chatActivo.user[0].apellidoMaterno
                  : ""}
              </div>
              :
              <div className="chat__right-list-item-info-nombre-nopersonal">
                {chatActivo.name ? chatActivo.name : chatActivo.user[0].name}{" "}
                {chatActivo.segundoNombre
                  ? chatActivo.segundoNombre
                  : chatActivo.user[0]
                  ? chatActivo.user[0].segundoNombre
                  : ""}{" "}
                {chatActivo.segundoNombre
                  ? chatActivo.apellidoPaterno
                  : chatActivo.user[0]
                  ? chatActivo.user[0].apellidoPaterno
                  : ""}{" "}
                {chatActivo.apellidoMaterno
                  ? chatActivo.apellidoMaterno
                  : chatActivo.user[0]
                  ? chatActivo.user[0].apellidoMaterno
                  : ""}
              </div>
            }
              {chatActivo.tipo==="personal"&&
              <div className="chat__right-list-item-info-last-conection">
           {/* {
   (() => {
if(lastConexionChatActivo){
  if(lastConexionChatActivo < 1){
    return 'activo hace un momento';
  }
    if (lastConexionChatActivo <=2 && lastConexionChatActivo <60){
     return `activo hace ${lastConexionChatActivo}m`
   }
   if(lastConexionChatActivo >=60){
     for(let i=1;i<=1440;i=i+60){
      if(lastConexionChatActivo === i){
        return `activo hace ${lastConexionChatActivo}h`
      }
     }
   }
}

   })()
} */}
              
               {conexion && conexion.fechatermino===null? 'activo ahora':conexion?`activo hace ${lastConexionChatActivo}`:''}    
                  
                
                
                
              </div>
              }
            </div>

          </div>
{          chatActivo.user&&
          <div className="chat__right-heard-right">
            <div className="chat__right-heard-right-search">
              <ChatSearch />
            </div>
            
            <div
              className="chat__right-heard-right-icon"
              onClick={hanleOpenInfoChat}
            >
              <i class="fas fa-info-circle"></i>
            </div>

          </div>
}
        </div>
      )}
    </>
    //   <AppBar position="static" className={classes.content}>
    //   <Toolbar variant="regular" >
    //     <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
    //     <Avatar src="https://honeysanime.com/wp-content/uploads/2017/10/Gintama-Gintoki-crunchyroll-1-560x315.jpg"></Avatar>
    //     </IconButton>
    //     <Typography variant="h6" color="inherit" className={classes.title}>
    //       Sakata Gintoki
    //     </Typography>
    //     <div className={classes.search}>
    //       <div className={classes.searchIcon}>
    //         <SearchIcon />
    //       </div>
    //       <InputBase
    //         placeholder="Search…"
    //         classes={{
    //           root: classes.inputRoot,
    //           input: classes.inputInput,
    //         }}
    //         inputProps={{ 'aria-label': 'search' }}
    //       />
    //     </div>
    //     <IconButton
    //       edge="end"
    //       className={classes.menuButton}
    //       color="inherit"
    //       aria-label="menu"
    //     >
    //       <MoreHorizIcon />
    //     </IconButton>
    //   </Toolbar>
    // </AppBar>
  );
};
