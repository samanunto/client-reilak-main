  
// import React from 'react'
// import { DataGrid } from '@material-ui/data-grid';

// export const TablaUserEvents = () => {

//   const dispatch = useDispatch();

//   const { events } = useSelector(state => state.events);

//   useEffect(() => {
//     if (activeEvents) {
//       setFormValues(activeEvents);
//     } else {
//       setFormValues(initEvent);

//     }
//   }, [events, setFormValues])

//   useEffect(() => {
//     dispatch(eventsStartLoading());
//   }, [dispatch])

//   numbers.map((number) => number * 2);

//     const columns = [
//         { field: 'id', headerName: 'ID', width: 70 },
//         { field: 'titulo', headerName: 'Titulo', width: 130 },
//         { field: 'descripcion', headerName: 'Descripcion', width: 130 },
//         { field: 'fechaInicio', headerName: 'Fecha Inicio', type: 'number',width: 90, },
//         { field: 'fechaFin', headerName: 'Fecha Fin', type: 'number',width: 90, }
//       ];
      
//       const rows = [
//         events.map(( titulo, id, descripcion, start, end , i) =>
//          {id: id}, {titulo: titulo}, {descripcion: descripcion}, {fechaInicio: start} ,{fechaFin: end},
//         )
//       ];
      
//       return (
//         <div style={{ height: 400, width: '100%' }}>
//           <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
//         </div>
//       );
// }