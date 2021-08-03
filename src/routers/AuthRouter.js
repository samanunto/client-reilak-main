import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Login } from '../components/auth/Login'



export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-containter">
                <Switch>
                    <Route  path="/login" component={Login}  />
                   


                    <Redirect to="/login" />
                </Switch>
            </div>
        
        </div>
    )
}
