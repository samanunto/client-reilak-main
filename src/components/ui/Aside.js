import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



export const Aside = () => {

  const {rol} = useSelector(state => state.auth)
  return (
    <aside className="aside">
      <nav className="nav-aside">
        <ul className="listado">
          <li className="botones">
          
            <Link className="li" to="/"> <i class="fas fa-home"></i><span> Principal</span> </Link>{" "}
            </li>{" "}
          <li className="botones">
            <Link className="li" to="/chat"> <i class="fas fa-comments"></i><span> Chat</span> </Link>{" "}
          </li>{" "}
        {(rol==='Administrador'|| rol === 'Jefatura')&&
          <li className="botones">
            <Link className="li" to="/eventos"> <i class="far fa-calendar-alt"></i><span> Eventos</span></Link>{" "}
          </li>
        }
          <li className="botones">
            <Link className="li" to="/tareas"> <i class="fas fa-clipboard-list"></i><span> Tareas</span> </Link>{" "}
          </li>{" "}
          <li className="botones">
            <Link className="li" to="/calendario"> <i class="fas fa-calendar-alt"></i><span> Calendario</span> </Link>{" "}
        
          </li>{" "}
          {(rol === 'Administrador') &&
          <li className="botones">
            <Link className="li" to="/usuarios"> <i class="fas fa-users-cog"></i><span> Usuario</span> </Link>
          </li>
}
           {(rol === 'Administrador') &&
          <li className="botones">
            <Link className="li" to="/dashboard"> <i class="fas fa-chart-line"></i><span> Dashboard</span> </Link>{" "}
          </li>
        }
        </ul>{" "}
      </nav>{" "}
    </aside>
  );
};