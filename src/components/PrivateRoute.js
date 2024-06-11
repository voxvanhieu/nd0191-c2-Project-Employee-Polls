import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authSelectors } from '../data/store';

import { history } from '../helpers';

export { PrivateRoute };

function PrivateRoute() {
  const auth = useSelector(authSelectors.selectValue);

  if (!auth) {
    return <Navigate to="/login" state={{ from: history.location }} />
  }

  return <Outlet />;
}