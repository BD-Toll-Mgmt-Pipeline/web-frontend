import React from 'react';
import {Navigate} from 'react-router-dom';
import {initialUrl} from 'shared/constants/AppConst';

import {authRouteConfig} from './auth';
import Error403 from './errorPages/Error403';
import {errorPagesConfigs} from './errorPages';
import {dashBoardConfigs} from './dashboards';
// import {appsConfig} from './apps';
// import {accountPagesConfigs} from './account';

const authorizedStructure = {
  fallbackPath: '/signin',
  unAuthorizedComponent: <Error403 />,
  routes: [
    ...dashBoardConfigs,
    // ...accountPagesConfigs,
  ],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};
const anonymousStructure = {
  routes: errorPagesConfigs.concat([
    {
      path: '/',
      element: <Navigate to={initialUrl} />,
    },
    {
      path: '*',
      element: <Navigate to='/error-pages/error-404' />,
    },
  ]),
};

export {authorizedStructure, unAuthorizedStructure, anonymousStructure};
