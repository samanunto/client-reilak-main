import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { userStartLoading, userStartDelete, userSetActive } from "../../actions/usuarios";
import { userFiltroEstado, userFiltroRol, userBuscar } from "../../actions/filtros";

import { uiOpenModal } from '../../actions/ui';
import { ResumenUsuario } from './ResumenUsuario';

const initEvent = {
    estado: '',
    buscar: ''
}

export const ListarUsuario = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userStartLoading());
    }, [dispatch])

    const [formValues, setFormValues] = useState(initEvent);

    const {
        estado,
        buscar
    } = formValues;

    useEffect(() => {
            setFormValues(initEvent);
   
        
    }, [setFormValues])

    



    const { users } = useSelector(state => state.users);
    const useractual = useSelector(state => state.auth);

    // Anular Usuario
    const anularUsuario = (id, estado) => {
        if(estado === "Activo"){
            estado = "Inactivo";
            const usuario = {id, estado};  
            dispatch(userStartDelete(usuario));
            dispatch(userStartLoading());
        }else if(estado === "Inactivo"){
            estado = "Activo";
            const usuario = {id, estado}; 
            dispatch(userStartDelete(usuario));
            dispatch(userStartLoading()); 
        }
        
    };

    const handleInputChanges = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleInputChange = ({ target }) => {
        dispatch(userFiltroEstado(target.value));
    }

    const handleRol = ({ target }) => {
        dispatch(userFiltroRol(target.value));
    }

    const handleBuscar = () => {
        dispatch(userBuscar(formValues.buscar));
    }

    const editarUsuario = (id, name, email, password, segundoNombre, apellidoPaterno, apellidoMaterno, area, fono, nacimiento, rol, cargo, rut) => {
        const prueba = { id, name, email, password, segundoNombre, apellidoPaterno, apellidoMaterno, area, fono, nacimiento, rol, cargo, rut };
        dispatch(userSetActive(prueba));
    };

    const handleClickNew = (id, name, email, segundoNombre, apellidoPaterno, apellidoMaterno, area, fono, nacimiento, rol, cargo, rut, imgusuario, ingreso, emailp,estado) => {
        const prueba = {id, name, email, segundoNombre, apellidoPaterno, apellidoMaterno, area, fono, nacimiento, rol, cargo, rut, imgusuario, ingreso, emailp,estado };
        dispatch(userSetActive(prueba));
        dispatch(uiOpenModal());
    }
  

    return (

        <div className="container-fluid general-mu">
            <div className="row cabezera-lu">

                <div className="col-1 espacioizq-cabezera-lu">

                </div>
                <div className="col btn-cabezera-lu">
                    <Link

                        to="/mantenedorusuario2"
                    >
                        {(useractual.rol == "Administrador")?
                        <button type="button" class="btn btn-primary btn-lu">Crear usuario</button>
                        :
                                                    ""}
                    </Link>
                </div>
                <div className="col espacioder-cabezera-lu">

                </div>

            </div>

            <div className="row tabla-lu ">
                <div className="col-1 izquierda-formulario-lu">

                </div>
                <div className="col tabla-contenedor-lu card border border-secondary">
                    <div className="row filtros-contenedor-lu">
                        <div className="col-1 espacio-filtros-lu">

                        </div>
                        <div className="col-3 rol-filtros-lu">
                            <div className="row ">
                                <div className="col ">
                                    <label for="exampleFormControlSelect1">Example select</label>
                                    <select class="form-control" onChange={handleRol} name="rol" id="exampleFormControlSelect1">
                                    <option defaultValue>Seleccione un rol...</option>
                                        <option value="Colaborador">Colaborador</option>
                                        <option value="Jefatura">Jefatura</option>
                                        <option value="Administrador">Administrador</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col label-opaco">
                                    Filtro por rol
                                </div>
                            </div>
                        </div>
                        <div className="col-3 permiso-filtros-lu">
                            <div className="row ">
                                <div className="col ">
                                    <label for="exampleFormControlSelect2">Example select</label>
                                    <select class="form-control" onChange={handleInputChange} name="estado" id="exampleFormControlSelect2">
                                    <option defaultValue>Seleccione un estado...</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row label-opaco">
                                <div className="col label-opaco">
                                    Filtro por Estado
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-4 permiso-buscar-lu">

                            <div className="row " >
                                <div className="col ">
                                    <input type="text" className="form-control btnBuscar" value={buscar} name="buscar" onChange={handleInputChanges} placeholder="Buscar" />
                                    
                                </div>
                                <div className="col ">
                                <button type="submit" onClick={handleBuscar} name="leso" class="btn btn-primary ">Buscar</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row datos-tabla-lu label-lu">
                        <div className="col-1 espacio-tabla-lu">

                        </div>
                        <div className="col datos-tabla-lu table-responsive">
                            <table class="table texto-principal">
                                <thead>
                                    <tr>
                                        <th scope="col ">#</th>
                                        <th scope="col">Rut</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Apellido Paterno</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Email Personal</th>
                                        <th scope="col">Cargo</th>
                                        <th scope="col">Rol</th>
                                        <th scope="col">Permisos</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {users.map(({ rut, id, name, apellidoPaterno, apellidoMaterno, email, area, cargo, segundoNombre, rol, estado,  fono, nacimiento, imgusuario, ingreso, emailp}, i) =>
                                        <tr key={i}>
                                            <th scope="row">{i}</th>
                                            <td>{rut}</td>
                                            <td>{name}</td>
                                            <td>{apellidoPaterno}</td>
                                            <td>{estado}</td>
                                            <td>{email}</td>
                                            <td>{area}</td>
                                            <td>{cargo}</td>
                                            <td>{rol}</td>
                                            <td>
                                                <td>
                                                    {(useractual.rol == "Administrador")?
                                                    <i className="fas fa-trash" onClick={() => { anularUsuario(id, estado); }}></i>
                                                    :
                                                    ""}
                                                    

                                                </td>
                                                <td>
                                                {(useractual.rol == "Administrador")?
                                                    <Link to="/mantenedorusuario2">
                                                        <i className="fas fa-pencil-alt iconos-lu" onClick={() => { editarUsuario(id, name, email, segundoNombre, apellidoPaterno, apellidoMaterno, area, fono, nacimiento, rol, cargo, rut); }}></i>
                                                    </Link>
                                                    :
                                                    ""}
                                                </td>
                                                <td>
                                                    <i class="fas fa-info-circle iconos-lu" onClick={() => { handleClickNew(id, name, email, segundoNombre, apellidoPaterno, apellidoMaterno, area, fono, nacimiento, rol, cargo, rut, imgusuario, ingreso, emailp,estado); }}></i>
                                                    <ResumenUsuario />
                                                </td>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-1 espacio-tabla-lu">

                        </div>
                    </div>
                    <div className="row espacio-contenedor-lu label-mu">

                    </div>
                </div>
                <div className="col-1 derecha-formulario-mu">

                </div>
            </div>
        </div>

    )
}