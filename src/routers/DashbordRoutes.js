import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { HomeScreen } from "../components/home/HomeScreen";
import { ListarUsuario } from "../components/mantenedorUsuario/ListarUsuario";

import { Configuracion } from "../components/perfil/Configuracion";

import { Perfil, PerfilScreen } from "../components/perfil/PerfilScreen";
import { ScreenTarea } from "../components/tareas/ScreenTarea";
import { Aside } from "../components/ui/Aside";
import { Navbar } from "../components/ui/Navbar";
// import { EventosScreen } from "../components/eventos/EventosScreen";
import { CalendarScreen } from "../components/calendario/CalendarScreen";
import { ChatScreen } from "../components/chat/ChatScreen";
import { MantenedorUsuario2 } from "../components/mantenedorUsuario/MantenedorUsuario2";
import { EventosScreen2 } from "../components/eventos/EventosScreen2";
import { DashboardScreen } from "../components/dashboard/DashboardScreen";
export const DashbordRoutes = () => {
  return (
    <div>
      <Navbar />
      <div className="main__content">
        <Aside />
        
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/perfil" component={PerfilScreen} />
            <Route exact path="/usuarios" component={ListarUsuario} />
            <Route exact path="/MantenedorUsuario2" component={MantenedorUsuario2} />
            <Route exact path="/eventos" component={EventosScreen2} />
            <Route exact path="/calendario" component={CalendarScreen} />
            <Route exact path="/configuracion" component={Configuracion} />
            <Route exact path="/tareas" component={ScreenTarea} />
            {/* <Route exact path="/eventos" component={EventosScreen} /> */}
            <Route exact path="/calendario" component={CalendarScreen} />
            <Route exact path="/chat" component={ChatScreen} />
            <Route exact path="/dashboard" component={DashboardScreen} />
            
            <Redirect to="/" />
          </Switch>
        
      </div>
    </div>
  );
};
