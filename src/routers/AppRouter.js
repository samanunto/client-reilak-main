import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { GetPassword } from '../components/auth/GetPassword';
import { GetPassword2 } from '../components/auth/GetPassword2';

import { AuthRouter } from './AuthRouter';
import { DashbordRoutes } from './DashbordRoutes'
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();
const {checking, uid} = useSelector(state => state.auth);


  useEffect(() => {
    dispatch(startChecking());
    
  }, [dispatch])

  if(checking){
    return (<h5>Espere...</h5>);
  }

    return (
        <Router>
        <div>
          <Switch>
          <PublicRoute exact path="/login" component={AuthRouter} isAuthenticated={!!uid} />
          <PublicRoute exact path="/getPassword" component={GetPassword}  />
          <PublicRoute exact path="/getPassword2" component={GetPassword2}  />
          <PrivateRoute path="/" component={DashbordRoutes} isAuthenticated={!!uid}/>
          
          </Switch>
        </div>
      </Router>
    )
}
