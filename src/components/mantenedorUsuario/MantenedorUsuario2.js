import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import { Link } from 'react-router-dom'
//Verificador
import Swal from 'sweetalert2';
import verificador  from 'verificador-rut'

import { userStartAddNew, userStartUpdate, userClearActiveEvent } from '../../actions/usuarios';

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    name: '',
    rut: '',
    password: '',
    segundoNombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    area: '',
    cargo: '',
    fono: '',
    nacimiento: nowPlus1.toDate(),
    rol: '',
    email: '',
    imgusuario: '',
    emailp: '',
    permisos: [], 
    //Funcionalidades Form
    stepActual: 1,
}

const fileName = {
    nameFile: ""
}

export const MantenedorUsuario2 = () => {

    

    const { activeUser } = useSelector(state => state.users);
    const useractual = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initEvent);

    useEffect(() => {
        if (activeUser) {
            console.log("Use effect");
            setFormValues({
                ...formValues,
                stepActual: 1,
            });
            console.log(stepActual);
            console.log(activeUser);
            setFormValues(activeUser);
            
        } else {
            setFormValues(initEvent);
   
        }
    }, [activeUser, setFormValues])

    const [titleValid, setTitleValid] = useState(true);

    const {
        //Valores Form
        name,
        rut,
        segundoNombre,
        apellidoPaterno,
        apellidoMaterno,
        area,
        cargo,
        fono,
        nacimiento,
        rol,
        email,
        emailp,
        permisos,
        //Funionalidades Form
        stepActual = 1,

      } = formValues;

    

        /***********************************************************
    SUBIDA DE ARCHIVOS
    **********************************************************/

    const [selectedFile, setSelectedFile] = useState("");

    const imageHandleChange = (e) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
            const file = e.target.files[0];


        }
    };
    useEffect(() => {
        if (selectedFile) {
            formValues.imgusuario = selectedFile;
        }
    }, [selectedFile])


    fileName.nameFile = selectedFile.name;

    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            nacimiento: e
        })
    }


    const handlePermisos = ({ target }) => {
        const arrpe = ['Publicaciones', 'Eventos'];
        const arre = ['Eventos'];
        const arrp = ['Publicaciones'];
        if(target.value == "Colaborador"){
            setFormValues({
                ...formValues,
                permisos: arrp,
                rol: target.value
            });
    }
        if(target.value == "Jefatura"){
            setFormValues({
                ...formValues,
                permisos: arre,
                rol: target.value
            });
    }
        if(target.value == "Administrador"){
            setFormValues({
                ...formValues,
                permisos: arrpe,
                rol: target.value
            });
    }
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleCancelar = () => {
        dispatch(userClearActiveEvent());
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if(useractual.rol == "Administrador"){
            const formData = new FormData();
        if (activeUser) {
            console.log(formValues.permisos);
            formData.set('rut', formValues.rut);       
            formData.set('password', formValues.password);
            formData.set('segundoNombre', formValues.segundoNombre);
            formData.set('apellidoPaterno', formValues.apellidoPaterno);
            formData.set('apellidoMaterno', formValues.apellidoMaterno);
            formData.set('area', formValues.area);
            formData.set('cargo', formValues.cargo);
            formData.set('fono', formValues.fono);
            formData.set('nacimiento', formValues.nacimiento);
            formData.set('rol', formValues.rol);
            formData.set('email', formValues.email);
            formData.set('emailp', formValues.emailp);
            formData.set('imgusuario', formValues.imgusuario);
            formData.set('name', formValues.name);
            formData.set('permisos', formValues.permisos);
            console.log(activeUser.id);
            formData.set('id', activeUser.id);
            dispatch(userStartUpdate(formData))
            dispatch(userClearActiveEvent());         
        } else {
              formData.set('rut', formValues.rut);       
              formData.set('password', formValues.password);
              formData.set('segundoNombre', formValues.segundoNombre);
              formData.set('apellidoPaterno', formValues.apellidoPaterno);
              formData.set('apellidoMaterno', formValues.apellidoMaterno);
              formData.set('area', formValues.area);
              formData.set('cargo', formValues.cargo);
              formData.set('fono', formValues.fono);
              formData.set('nacimiento', formValues.nacimiento);
              formData.set('rol', formValues.rol);
              formData.set('email', formValues.email);
              formData.set('emailp', formValues.emailp);
              formData.set('imgusuario', formValues.imgusuario);
              formData.set('name', formValues.name);
              formData.set('permisos', formValues.permisos);
            dispatch(userStartAddNew(formData));
            dispatch(userClearActiveEvent());
        }

        setTitleValid(true);
        }else{
            return Swal.fire('Error', 'Solo un administrador puede gestionar un usuario', 'error');
        }
        

    }

      //Handles
    const handleStepActual = (valor) => {
        if(valor == "anterior"){
            
            if(stepActual == 1){
                setFormValues({
                    ...formValues,
                    stepActual: stepActual - 1,      
                });
            }
            if(stepActual == 2){
                setFormValues({
                    ...formValues,
                    stepActual: stepActual - 1,
                });
              }
              if(stepActual == 3){
                setFormValues({
                    ...formValues,
                    stepActual: stepActual - 1,
                });
              }
              if(stepActual == 4){
                setFormValues({
                    ...formValues,
                    stepActual: stepActual - 1,
                });
              }
        }else if(valor == "siguiente"){
            if(stepActual == 1){
                if (verificador(formValues.rut) == false) {
                    return Swal.fire('Error', 'El rut es incorrecto', 'error');
                }
                if (formValues.name == "") {
                    return Swal.fire('Error', 'El nombre es obligatorio', 'error');
                }
                if (formValues.apellidoPaterno == "") {
                    return Swal.fire('Error', 'El apellido paterno es obligatorio', 'error');
                }
                setFormValues({
                    ...formValues,
                    stepActual: stepActual + 1,
                });
            }
            if(stepActual == 2){
                console.log(stepActual);
                if (formValues.emailp == "") {
                    return Swal.fire('Error', 'El email personal es obligatorio', 'error');
                }
                if (formValues.email == "") {
                    return Swal.fire('Error', 'El email corporativo es obligatorio', 'error');
                }
                if (formValues.fono == "") {
                    return Swal.fire('Error', 'El número telefonico es obligatorio', 'error');
                }
                setFormValues({
                    ...formValues,
                    stepActual: stepActual + 1,
                });
                console.log(stepActual);
              }
              if(stepActual == 3){
                setFormValues({
                    ...formValues,
                    stepActual: stepActual + 1,
                });
              }
              if(stepActual == 4){
                if (formValues.area == "") {
                    return Swal.fire('Error', 'El área es obligatoria', 'error');
                }
                if (formValues.cargo == "") {
                    return Swal.fire('Error', 'El cargo es obligatorio', 'error');
                }
                setFormValues({
                    ...formValues,
                    stepActual: stepActual + 1,
                });
              }
        }      
    };

    return (
        <div className="main__home">
            <form
                className="contenedor-usuario-ysm"
                onSubmit={handleSubmitForm}
            >            
                <div class="header-usuario-ysm">
                    <div className="titulo-usuario-ysm">{(activeUser) ? 'Editar usuario' : 'Nuevo usuario'}</div>
                </div>
                {
                (stepActual == 1) ?
                    <div class="body-usuario-ysm">
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm" type="text" id="rut" name="rut" onChange={handleInputChange} value={rut} placeholder="Ingrese su RUT..."></input>
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm" type="text" id="nombre" name="name" onChange={handleInputChange} value={name} placeholder="Ingrese su nombre..."></input>
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm" type="text" id="segundoNombre" name="segundoNombre" onChange={handleInputChange} value={segundoNombre} placeholder="Ingrese su segundo nombre..."></input>
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm" type="text" id="apellidoPaterno" name="apellidoPaterno" onChange={handleInputChange} value={apellidoPaterno} placeholder="Ingrese su apellido paterno..."></input>
                        </div>                        
                    </div>
                :
                (stepActual == 2) ?
                    <div class="body-usuario-ysm">
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm" type="text" id="ApellidoMaterno" name="apellidoMaterno" onChange={handleInputChange} value={apellidoMaterno} placeholder="Ingrese su apellido materno..."></input>
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm" type="text" id="emailp" name="emailp" onChange={handleInputChange} value={emailp} placeholder="Ingrese su email personal..."></input>       
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm" type="text" id="email" name="email" onChange={handleInputChange} value={email} placeholder="Ingrese su email corporativo..."></input>                            
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                        <input className="input-usuario-ysm" type="text" id="fono" name="fono" onChange={handleInputChange} value={fono} placeholder="Ingrese su fono..."></input>
                        </div>                                                                          
                    </div> 
                :
                (stepActual == 3) ?
                    <div class="body-usuario-ysm">
                        <div className="input-contenedor-usuario-ysm">
                        <DateTimePicker
                            onChange={handleEndDateChange}
                            value={dateEnd}
                            className="input-usuario-ysm"
                        />
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input type="file" class="input-usuario-ysm" name="file" id="customFile" onChange={imageHandleChange} accept=".img,.png,.jpg,.jepg" />          
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input type="text" className="input-usuario-ysm" placeholder="Hoy" disabled/>                        
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm" type="text" id="empresa" name="empresa" placeholder="Reilak" disabled></input>
                        </div>                                                                                              
                    </div> 
                :
                (stepActual == 4) ? 
                    <div class="body-usuario-ysm">
                        <div className="input-contenedor-usuario-ysm">
                            <select className="input-usuario-ysm" name="rol" onChange={handlePermisos} >
                                <option defaultValue>Selecciona un cargo...</option>
                                { (activeUser)? 'Editar usuario': <option value="Colaborador">Colaborador</option> }
                                <option value="Jefatura">Jefatura</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <select className="input-usuario-ysm" onChange={handleInputChange} name="area" >
                                <option defaultValue>Selecciona un área...</option>
                                <option value="Recursos humanos">Recursos humanos</option>
                                <option value="Finanzas">Finanzas</option>
                                <option value="Marketing">Marketing</option>
                            </select>     
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                        <select className="input-usuario-ysm" name="cargo" onChange={handleInputChange} >
                                <option defaultValue>Selecciona un cargo...</option>
                                <option value="Administrativo Credito" >Administrativo Credito</option>
                                <option value="Gerente Administrativo">Gerente Administrativo</option>
                                <option value="Jefe de control de calidad" >Jefe de control de calidad</option>
                            </select>   
                        </div>
                                            
                    </div>
                : ""}        
                <div className="stepbtn-usuario-ysm">
                    <div className="izquierda-stepbtn-ysm">                        
                        {(stepActual == 1)?<i class="fas fa-arrow-left fa-2x flecha-izquierda-icono-inactivo"/>:<i class="fas fa-arrow-left fa-2x flecha-izquierda-icono" onClick={() => { handleStepActual("anterior"); }} />}                                         
                    </div>
                    <div className="submitpbtn-usuario-ysm">
                        {(stepActual == 4)?<button type="submit" class="button button2"><span>{ (activeUser)? 'Editar usuario':'Nuevo usuario' }</span></button>:""}
                    </div>
                    <div className="derecha-stepbtn-ysm">
                        {(stepActual == 4)?<i class="fas fa-check fa-2x flecha-derecha-icono-inactivo"/>:<i class="fas fa-arrow-right fa-2x flecha-derecha-icono" onClick={() => { handleStepActual("siguiente"); }} />}
                    </div>
                </div>            
            </form>
        </div>
    )
}