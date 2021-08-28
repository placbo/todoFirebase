import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Auth';

//const MARIA = 'flettemia@google.com';
const MARIA = 'msindre@yahoo.co.uk';
export const PCB = 'perbjester@gmail.com';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          currentUser.email === PCB || currentUser.email === MARIA ? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to={'/unauthorised'} />
          )
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

export default PrivateRoute;
