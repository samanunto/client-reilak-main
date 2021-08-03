
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { useSocket } from "../hooks/useSockets";
import { types } from "../types/types";

export const sendEmailStartAddNew = (email) => {
    // const {checking} = useSelector(state => state.auth)
    // useEffect(() => {
    //     if(!checking){
    //         conectarSocket();
    //     }
   
    // }, [checking])
    return async(dispatch,getState) => {
        try {
     
        const resp = await fetchSinToken('correo', {email}, 'POST');
        const body = await resp.json();
        if(!body.ok){
            Swal.fire('no existe correo', '', 'error');
            console.log(body)
            console.log(body.ok)
        } else if(body.ok) {
            Swal.fire('se envio correo para su recuperacion', '', 'success');
        }

        // const { checking } = getState().auth;
        // const {conectarSocket} = useSocket('http://localhost:4000')

        // if(!checking){
        //     conectarSocket();


        // }

        }  catch (error) {
            Swal.fire('Hubo un error contacte con el administrador', '', 'error');
           
        }
       



        


    }
}