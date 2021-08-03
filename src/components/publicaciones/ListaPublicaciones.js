import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  eventStartLoading,
  eventSetActive,
  eventDeleted,
  eventStartDelete,
  eventStartUpdate,
  ReaccionStartUpdate,
} from "../../actions/events";
import moment from "moment";
import { uiOpenModal } from "../../actions/ui";
import { MyBirthday } from "./MyBirthday";

export const ListaPublicaciones = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  // Eliminar publicacion
  const eliminarPublicacion = (id) => {
    console.log(id);
    dispatch(eventStartDelete(id));
   
  };
  // editar publicacion
  const editarPublicacion = (id, titulo, contenido, multimedia) => {
    const prueba = { id, titulo, contenido, multimedia };
    dispatch(eventSetActive(prueba));
    dispatch(uiOpenModal());
  };

  const handleReaccion = (id, titulo, contenido, multimedia, reaccion) => {
    const prueba = { id, titulo, contenido, multimedia, reaccion };
    dispatch(ReaccionStartUpdate(prueba));
  };

  const { uid } = useSelector((state) => state.auth);
  const { events } = useSelector((state) => state.calendar);

  useEffect(() => {
    const option = document.querySelectorAll(
        ".publicaciones__heard-top-option-btn"
      ),
      info = document.querySelectorAll(
        ".publicaciones__heard-top-option-content"
      );

    for (let i = 0; i < option.length; i++) {
      option[i].addEventListener("click", () => {
        console.log("click en", i);
        console.log(info[i]);
        if (info[i].style.display === "block") {
          info[i].style.display = "none";
        } else {
          info[i].style.display = "block";
        }
      });
    }
  }, [events]);
  const option = document.querySelectorAll(
      ".publicaciones__heard-top-option-btn"
    ),
    info = document.querySelectorAll(
      ".publicaciones__heard-top-option-content"
    );

  for (let i = 0; i < option.length; i++) {
    option[i].addEventListener("click", () => {
      console.log("click en", i);
      console.log(info[i]);
      if (info[i].style.display === "block") {
        info[i].style.display = "none";
      } else {
        info[i].style.display = "block";
      }
    });
  }
  return (
    <div className="lista__publicaciones">
      <MyBirthday />
      {events != 0 ? (
        events.map(
          (
            { titulo, contenido, fecha, multimedia, id, reaccion, usuario },
            i
          ) => (
            <div key={id} className="card__publicaciones">
              <div className="publicaciones__heard">
                <div className="publicaciones__heard-top">
                  <div className="publicaciones__heard-top-titulo">
                    {titulo}
                  </div>
                  {usuario === uid && (
                    <div className="publicaciones__heard-top-option">
                      <div className="publicaciones__heard-top-option-btn">
                        <i class="fas fa-ellipsis-h fa-lg"> </i>
                      </div>
                      <div
                        className="publicaciones__heard-top-option-content"
                        data-id={i}
                      >
                        <li
                          className="publicaciones__heard-top-option-content-list"
                          onClick={() => {
                            eliminarPublicacion(id);
                          }}
                        >
                          <i class="fas fa-trash">
                            {" "}
                            <span>Eliminar</span>
                          </i>
                        </li>
                        <li
                          className="publicaciones__heard-top-option-content-list"
                          onClick={() => {
                            editarPublicacion(
                              id,
                              titulo,
                              contenido,
                              multimedia
                            );
                          }}
                        >
                          <i class="fas fa-pen">
                            {" "}
                            <span>Editar</span>
                          </i>
                        </li>
                      </div>
                    </div>
                  )}
                </div>
                <div className="publicaciones__heard-bottom">
                  <span className="publicaciones__heard-bottom-fecha">
                    {moment(fecha).format("DD-MM-YYYY, h:mm a")}
                  </span>
                </div>
              </div>

              <div className="publicaciones__texto">
                <div dangerouslySetInnerHTML={{ __html: contenido }} />
              </div>
              <div className="publicaciones__multimedia">
                {multimedia ? (
                  multimedia.substr(-3) === "mp4" ? (
                    <div className="publicaciones__multimedia">
                      <ReactPlayer
                        url={multimedia}
                        width="100%"
                        height="100%"
                        controls
                        volume="0.8"
                      />
                    </div>
                  ) : (
                    <img src={multimedia} width="100%" height="100%" />
                  )
                ) : (
                  ""
                )}
              </div>

              <div className="publicaciones__footer">
                <div
                  className="publicaciones__reaccion"
                  onClick={() => {
                    handleReaccion(id);
                  }}
                >
                  {reaccion && reaccion.includes(uid) ? (
                    <i class="fas fa-heart"></i>
                  ) : (
                    <i class="far fa-heart"></i>
                  )}
                </div>
                <div> {reaccion ? reaccion.length : 0}</div>
              </div>
            </div>
          )
        )
      ) : (
        <div className="no-publicaciones">No existen publicaciones</div>
      )}
    </div>
  );
};
