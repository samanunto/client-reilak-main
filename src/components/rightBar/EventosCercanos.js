import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  eventsCercanosStartLoading,
} from "../../actions/eventos";
import moment from "moment";

const initEvent = {
  tipoEvento: 'Proximos Eventos',
  tipoActual: 'Evento'
}

export const EventosCercanos = () => {

  const tiempoActual = new Date().getTime()

  const dispatch = useDispatch();

  const { events } = useSelector(state => state.events);
  const { uid } = useSelector(state => state.auth);

  const [formValues, setFormValues] = useState(initEvent);

  useEffect(() => {
    setFormValues(initEvent);
  }, [setFormValues])

  useEffect(() => {
    dispatch(eventsCercanosStartLoading());
  }, [dispatch])

  const {
    tipoEvento,
    tipoActual
  } = formValues;

  const mes = moment(tiempoActual).format("MMMM")
  const dia = moment(tiempoActual).format("DD")
  const diaescrito = moment(tiempoActual).format("dddd")

  const verificadorEvento = (tipo, reunion) => {
    const er = reunion
    const arraystring = er.toString();
    const encontrado = arraystring.search(uid);
    const numeroObtenido =
      ('Evento' == tipo) ? 'block' :
        ('Reunion' == tipo && encontrado >= 0) ? 'block' :
          ('Reunion' == tipo && encontrado < 0) ? 'none' :
            'block';
    return numeroObtenido;
  }

  const handleTipoEvento = (tipoEve) => {
    console.log("tipoEve: "+tipoEve);
    if("Proximos Eventos" == tipoEve){
      setFormValues({
        ...formValues,
        tipoEvento: tipoEve,
        tipoActual: "Evento"
      });
      dispatch(eventsCercanosStartLoading());
    }
    else if("Proximas Reuniones" == tipoEve){
      setFormValues({
        ...formValues,
        tipoEvento: tipoEve,
        tipoActual: "Reunion"
      });
      console.log(tipoActual);
      dispatch(eventsCercanosStartLoading());
    }
    
  }

  return (

    <div className="container-evecercanos-ysm">
      <div className="header-evecercanos-ysm">
        {tipoEvento}
      </div>
      <div className="body-evecercanos-ysm">
        <div className="tipo-evecercanos-ysm">
          <div className="evento-tipo-evecercanos-ysm" onClick={() => { handleTipoEvento("Proximos Eventos"); }}>
            Evento
          </div>
          <div className="reunion-tipo-evecercanos-ysm" onClick={() => { handleTipoEvento("Proximas Reuniones"); }}>
            Reunión
          </div>
        </div>
        <div className="eventos-container-evecercanos-ysm">
          {events.map(({ titulo, id, descripcion, start, tipo, end, reunion }, i) =>
            verificadorEvento(tipo, reunion) == "block" && tipoActual == tipo ? 
              <div className="evento-container-evecercanos-ysm">
                <div className="evento-evecercanos-ysm">
                  <div className="calendario-evecercanos-ysm">
                    <time datetime="2014-2-20" class="icon">
                      <strong>{moment(start).format("MMMM").toUpperCase()}</strong>
                      <span>{moment(start).format("DD")}</span>
                    </time>
                  </div>
                  <div className="descripcion-evecercanos-ysm">
                    {titulo}
                  </div>
                </div>
              </div>
              :verificadorEvento(tipo, reunion) == "block"  && tipoActual == tipo?
              <div className="evento-container-evecercanos-ysm">
                <div className="evento-evecercanos-ysm">
                  <div className="calendario-evecercanos-ysm">
                    <time datetime="2014-2-20" class="icon">
                    <strong>{moment(start).format("MMMM").toUpperCase()}</strong>
                      <span>{moment(start).format("DD")}</span>
                    </time>
                  </div>
                  <div className="descripcion-evecercanos-ysm">
                    {titulo}
                  </div>
                </div>
              </div>
              : "" 
          )}
        </div>
      </div>
    </div>

  );

};