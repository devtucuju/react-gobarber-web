import React from 'react';
import {RouteProps as ReactRouteProps,Route as ReactRoute,Redirect} from 'react-router-dom';
import { useAuth } from '../context/auth';

interface RouteProps extends ReactRouteProps{
isPrivate?:boolean;
component:React.ComponentType;
}

// rota privada/autenticado redireciona dashboard
// rota privada/não autenticado redireciona login
// rota não privada/autenticado redireciona dashboard
// rota não privada/não autenticado acessa



const Route: React.FC<RouteProps> = ({isPrivate = false,component:Component,...rest}) => {
  const {user} = useAuth()
  return (
    <ReactRoute {...rest}
   render={({location})=>{
return isPrivate === !!user ? (<Component/>) : (<Redirect to={{pathname:isPrivate?'/':"dashboard",state:{from:location}}}/>)
   }} />


  );
}

export default Route;
