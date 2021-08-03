import Swal from 'sweetalert2';
import { fetchConAxios, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import moment from 'moment';

export const dashboardUsersCount = () => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken("dashboard/userscount/");
            const body = await resp.json();
            const users = body.usuario;
            dispatch(dashboardLoaded(users));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardLoaded = (dashboard) => ({
    type: types.dashboardLoaded,
    payload: dashboard,
});

export const dashboardUsersOnline = () => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken("dashboard/usersonline/");
            const body = await resp.json();
            const users = body.usuario;
            dispatch(dashboardUsuariosOnline(users));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardUsuariosOnline = (dashboard) => ({
    type: types.dashboardUsuariosOnline,
    payload: dashboard,
});

export const dashboardUsersOffline = () => {

    return async(dispatch) => {
        try {
            const resp = await fetchConToken("dashboard/usersoffline/");
            const body = await resp.json();
            const users = body.usuario;
            dispatch(dashboardUsuariosOffline(users));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardUsuariosOffline = (dashboard) => ({
    type: types.dashboardUsuariosOffline,
    payload: dashboard,
});

export const dashboardPOTW = () => {



    // const dia = moment().get('date')
    // console.log(dia)
    // const anio = moment().get('year')
    // console.log(anio)
    // const mes = moment().get('month')
    // const mes2 = mes + 1
    // console.log(mes)


    // const fechaInicio = new Date(anio + "-" + mes2 + "-24")
    // console.log(fechaInicio)
    return async(dispatch) => {
        //CALCULO PRIMER DIA DE LA SEMANA
        const diaDeLaSemana = moment().isoWeekday()
        const resta = diaDeLaSemana - 1

        // CALCULO FECHA INICIO
        var date = moment("2021-07-30")
        const { _d } = date.subtract(resta, 'days')
        const fechaGG = new Date(_d)
        const fechaInicio = moment(fechaGG).format("yy-MM-DD")

        //CALCULO SEGUNDO DIA DE LA SEMANA
        var date2 = moment("2021-07-30")
        const diaDeLaSemana2 = moment().isoWeekday()
        const suma = 7 - diaDeLaSemana2
            // CALCULO FECHA INICIO
        const d = date2.add(suma, 'days')
        const d2 = d._d
        const fechaGG2 = new Date(d2)
        const fechaFin = moment(fechaGG2).format("yy-MM-DD")
        try {
            const resp = await fetchConToken(`dashboard/potw/${fechaInicio}`, fechaInicio);
            const body = await resp.json();
            const users = body.usuario;
            console.log(users);
            dispatch(dashboardPublicacionesSemanales(users));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardPublicacionesSemanales = (dashboard) => ({
    type: types.dashboardPublicacionesSemanales,
    payload: dashboard,
});

export const dashboardEOTW = () => {



    // const dia = moment().get('date')
    // console.log(dia)
    // const anio = moment().get('year')
    // console.log(anio)
    // const mes = moment().get('month')
    // const mes2 = mes + 1
    // console.log(mes)


    // const fechaInicio = new Date(anio + "-" + mes2 + "-24")
    // console.log(fechaInicio)
    return async(dispatch) => {
        //CALCULO PRIMER DIA DE LA SEMANA
        const diaDeLaSemana = moment().isoWeekday()
        const resta = diaDeLaSemana - 1

        // CALCULO FECHA INICIO
        var date = moment("2021-07-30")
        const { _d } = date.subtract(resta, 'days')
        const fechaGG = new Date(_d)
        const fechaInicio = moment(fechaGG).format("yy-MM-DD")

        //CALCULO SEGUNDO DIA DE LA SEMANA
        var date2 = moment("2021-07-30")
        const diaDeLaSemana2 = moment().isoWeekday()
        const suma = 7 - diaDeLaSemana2
            // CALCULO FECHA INICIO
        const d = date2.add(suma, 'days')
        const d2 = d._d
        const fechaGG2 = new Date(d2)
        const fechaFin = moment(fechaGG2).format("yy-MM-DD")
        try {
            const resp = await fetchConToken(`dashboard/eotw/${fechaInicio}`, fechaInicio);
            const body = await resp.json();
            const users = body.usuario;
            console.log(users);
            dispatch(dashboardEventosSemanales(users));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardEventosSemanales = (dashboard) => ({
    type: types.dashboardEventosSemanales,
    payload: dashboard,
});

export const dashboardCD = () => {



    // const dia = moment().get('date')
    // console.log(dia)
    // const anio = moment().get('year')
    // console.log(anio)
    // const mes = moment().get('month')
    // const mes2 = mes + 1
    // console.log(mes)


    // const fechaInicio = new Date(anio + "-" + mes2 + "-24")
    // console.log(fechaInicio)
    return async(dispatch) => {
        //CALCULO PRIMER DIA DE LA SEMANA
        const diaDeLaSemana = moment().isoWeekday()
        const resta = diaDeLaSemana - 1

        // CALCULO FECHA INICIO
        var date = moment("2021-07-30")
        const { _d } = date.subtract(resta, 'days')
        const fechaGG = new Date(_d)
        const fechaInicio = moment(fechaGG).format("yy-MM-DD")

        //CALCULO SEGUNDO DIA DE LA SEMANA
        var date2 = moment("2021-07-30")
        const diaDeLaSemana2 = moment().isoWeekday()
        const suma = 7 - diaDeLaSemana2
            // CALCULO FECHA INICIO
        const d = date2.add(suma, 'days')
        const d2 = d._d
        const fechaGG2 = new Date(d2)
        const fechaFin = moment(fechaGG2).format("yy-MM-DD")
        try {
            const resp = await fetchConToken(`dashboard/conexionesdiarias/${fechaInicio}`, fechaInicio);
            const body = await resp.json();
            const users = body.usuario;
            console.log(users);
            dispatch(dashboardConexionesDiarias(users));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardConexionesDiarias = (dashboard) => ({
    type: types.dashboardConexionesDiarias,
    payload: dashboard,
});