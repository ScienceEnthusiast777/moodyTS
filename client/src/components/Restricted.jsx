import React, { Component } from 'react';
import { Route, Redirect} from 'react-router-dom';

const Restricted = ({
  user,
  path, 
  redirect = '/',
  ...rest
})=>{
  return(
    <Route
      exact path={path}
      render={props =>{
        return user? (
          <Component {...props}{...rest}user={user}/>
        ) : 
        (
          <Redirect to={redirect}/>
        )
      }}
    />
  )
}

export default Restricted; 