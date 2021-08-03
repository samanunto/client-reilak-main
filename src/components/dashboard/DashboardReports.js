import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardCD, dashboardUsersCount, dashboardUsersOffline, dashboardUsersOnline } from "../../actions/dashboard";
import {Bar,Pie} from 'react-chartjs-2';

export const DashboardReports = () => {

    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(dashboardUsersOffline());
      dispatch(dashboardUsersOnline());
      dispatch(dashboardCD());
    }, [dispatch])

    const {usuariosonline, usuariosoffline} = useSelector(state => state.dashboard);

    return (
        <div className="dashboard__content-report">
          <div className="dashboard__content-repot-left">
            <Bar
            data={{
                labels:['lunes','martes','miercoles','jueves','viernes','sabado', 'domingo'],
                datasets:[{
                    label:'Conexiones',
                    data:[10,20,30,40,50,60,70,80,90,100],
                    backgroundColor:'red',
                    color:'white'
                }]

            }}
     
            options={{
                scales:{
                    xAxes:[
                        {
        
                                labelString:"Dias",
                                display:true,
                                fontColor:'white',
                            }

                    ],
                    yAxes:[
                        {
                            scales:{
                                labelString:'Porcentaje',
                                display:true,
                                fontColor:'white',
                            },
                            ticks:{
                                beginAtZero:true,
                                fontColor:'white',
                            }
                        }
                    ],
                },
                layout: {
                    padding: 0,
   
                },
                responsive: true,
                maintainAspectRatio: false,
                
            }}
            />
          </div>
          <div className="dashboard__content-repot-right">
            <Pie
            data={{
                labels:['conectados','desconectados'],
                datasets:[{
                    label:'Conexiones',
                    data:[usuariosonline,usuariosoffline],
                    backgroundColor:['green','orange'],
                }]

            }}
            options={{
                layout: {
                    padding: 0,
      
                },
                responsive: true,
                maintainAspectRatio: false,
            }}

     
     
            />
          </div>
        </div>
    )
}
