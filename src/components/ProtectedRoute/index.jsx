import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from 'utils/user';
import { AppRoutes } from 'routes';

const ProtectedRoute = ({ path, component, isProtected }) => {
  return isProtected ? (
    isLoggedIn() ? (
      <Route path={path} component={component} exact />
    ) : (
      <Redirect to={{ pathname: AppRoutes.LOGIN.path }} />
    )
  ) : (
    <Route path={path} component={component} exact />
  );
};

export default ProtectedRoute;
