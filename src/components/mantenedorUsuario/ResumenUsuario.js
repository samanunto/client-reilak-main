  
import React, { useEffect, useState } from "react";
import moment from 'moment';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';
import { userClearActiveEvent } from '../../actions/usuarios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');

const initEvent = {
    id: '', 
    name: '', 
    email: '', 
    segundoNombre: '', 
    apellidoPaterno: '', 
    apellidoMaterno: '', 
    area: '', 
    fono: '', 
    nacimiento: '', 
    rol: '', 
    cargo: '', 
    rut: '', 
    imgusuario: '', 
    ingreso: '', 
    emailp : '',
    estado : '',
    nacimiento: now.toDate(),
    ingreso: now.toDate()
}

export const ResumenUsuario = () => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui);
    const { activeUser } = useSelector(state => state.users);

    const [formValues, setFormValues] = useState(initEvent);

    const { id, name, email, segundoNombre, apellidoPaterno, apellidoMaterno, area, fono, nacimiento, rol, cargo, rut, imgusuario, ingreso, emailp,estado  } = formValues;

    useEffect(() => {
        if (activeUser) {
            setFormValues(activeUser);
        } else {
            setFormValues(initEvent);
        }
    }, [activeUser, setFormValues])


    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(uiCloseModal());
        dispatch(userClearActiveEvent());
        setFormValues(initEvent);
    }



    return (
        <Modal
            isOpen={modalOpen}
            //   onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal modal-publicacion modal-resumenusuario-ysm"
            overlayClassName="modal-fondo"
        >
            <div className="container-resumenusuario-ysm">
                <div className="titulo-resumenusuario-ysm">
                    <div className="img-container-resumenusuario-ysm">
                        <div className="img-titulo-resumenusuario-ysm">
                            <img className="img-resumenusuario-ysm" src={imgusuario} ></img>
                        </div>
                    </div>
                    <div className="titulo-container-resumenusuario-ysm">
                        <div className="container-titulo-resumenusuario-ysm">
                            <div className="label-titulo-resumenusuario-ysm">
                                <div className="subtituloprincipal-titulo-resumenusuario-ysm">
                                    Rut
                                </div>
                                <div className="dato-titulo-resumenusuario-ysm">
                                    {rut}
                                </div>
                            </div>
                            <div className="label-titulo-resumenusuario-ysm">
                                <div className="subtituloprincipal-titulo-resumenusuario-ysm">
                                    Nombre
                                </div>
                                <div className="dato-titulo-resumenusuario-ysm">
                                    {name}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="body-resumenusuario-ysm">
                    <div className="apartado-body-resumenusuario-ysm">
                        <div className="nombreapartado-titulo-resumenusuario-ysm">
                            Perfil de Cargos
                        </div>
                        <div className="container-body-resumenusuario-ysm">
                            <div className="labelcompartido-body-resumenusuario-ysm">
                                <div className="compartidos-body-resumenusuario-ysm">
                                    <div className="subtitulo-titulo-resumenusuario-ysm">
                                        Rol
                                    </div>
                                    <div className="datopequeño-titulo-resumenusuario-ysm">
                                        {rol}
                                    </div>
                                </div>
                                <div className="compartidos-body-resumenusuario-ysm">
                                    <div className="subtitulo-titulo-resumenusuario-ysm">
                                        Área
                                    </div>
                                    <div className="datopequeño-titulo-resumenusuario-ysm">
                                        {area}
                                    </div>
                                </div>

                            </div>
                            <div className="labelsolo-body-resumenusuario-ysm">
                                <div className="label-body-resumenusuario-ysm">
                                    <div className="subtitulo-titulo-resumenusuario-ysm">
                                        Cargo
                                    </div>
                                    <div className="datopequeño-titulo-resumenusuario-ysm">
                                        {cargo}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="apartado-body-resumenusuario-ysm">
                        <div className="nombreapartado-titulo-resumenusuario-ysm">
                            Contacto
                        </div>
                        <div className="container-body-resumenusuario-ysm">
                            <div className="labelcompartido-body-resumenusuario-ysm">
                                <div className="compartidos-body-resumenusuario-ysm">
                                    <div className="subtitulo-titulo-resumenusuario-ysm">
                                        Email Corporativo
                                    </div>
                                    <div className="datopequeño-titulo-resumenusuario-ysm">
                                        {email}
                                    </div>
                                </div>
                                <div className="compartidos-body-resumenusuario-ysm">
                                    <div className="subtitulo-titulo-resumenusuario-ysm">
                                        Email Personal
                                    </div>
                                    <div className="datopequeño-titulo-resumenusuario-ysm">
                                        {emailp}
                                    </div>
                                </div>

                            </div>
                            <div className="labelsolo-body-resumenusuario-ysm">
                                <div className="label-body-resumenusuario-ysm">
                                    <div className="subtitulo-titulo-resumenusuario-ysm">
                                        Fono
                                    </div>
                                    <div className="datopequeño-titulo-resumenusuario-ysm">
                                        {fono}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="apartado-body-resumenusuario-ysm">
                        <div className="nombreapartado-titulo-resumenusuario-ysm">
                            Otros
                        </div>
                        <div className="container-body-resumenusuario-ysm">
                            <div className="labelcompartido-body-resumenusuario-ysm">
                                <div className="compartidos-body-resumenusuario-ysm">
                                    <div className="subtitulo-titulo-resumenusuario-ysm">
                                        Estado
                                    </div>
                                    <div className="datopequeño-titulo-resumenusuario-ysm">
                                        {estado}
                                    </div>
                                </div>
                                <div className="compartidos-body-resumenusuario-ysm">
                                    <div className="subtitulo-titulo-resumenusuario-ysm">
                                        Ingreso
                                    </div>
                                    <div className="datopequeño-titulo-resumenusuario-ysm">
                                    {moment(ingreso).format("DD-MM-yy")}
                                    </div>
                                </div>

                            </div>
                            <div className="labelsolo-body-resumenusuario-ysm">
                                <div className="label-body-resumenusuario-ysm">
                                    <div className="subtitulo-titulo-resumenusuario-ysm">
                                        Fecha de Nacimiento
                                    </div>
                                    <div className="datopequeño-titulo-resumenusuario-ysm">
                                    {moment(nacimiento).format("DD-MM-yy")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}