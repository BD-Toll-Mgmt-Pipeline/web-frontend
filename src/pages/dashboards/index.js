import React from 'react';
import {RoutePermittedRole} from 'shared/constants/AppConst';
import EditMember from './MemberModule/EditMember/EditMember';

const HealthCare = React.lazy(() => import('./HealthCare'));
const ECommerce = React.lazy(() => import('./ECommerce'));
const CRM = React.lazy(() => import('./CRM'));
const MemberModule = React.lazy(() => import('./MemberModule'));
const RentalModule = React.lazy(() => import('./RentalModule'));
const Academy = React.lazy(() => import('./Academy'));
const Metrics = React.lazy(() => import('./Metrics'));
const Widgets = React.lazy(() => import('./Widgets'));
const NewMemberAdd = React.lazy(() => import('../dashboards/MemberModule/NewMemberAdd/NewMemberAdd'));
const NewRentalAdd = React.lazy(() => import('../dashboards/RentalModule/NewRentalAdd/NewRentalAdd'));


export const dashBoardConfigs = [
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/academy',
    element: <Academy />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/analytics',
    element: <RentalModule />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/e-commerce',
    element: <ECommerce />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/crm',
    element: <CRM />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/health-care',
    element: <HealthCare />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/crypto',
    element: <MemberModule />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/metrics',
    element: <Metrics />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/widgets',
    element: <Widgets />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/add-new-member',
    element: <NewMemberAdd />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/edit-member/:id',
    element: <EditMember />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/add-new-rental',
    element: <NewRentalAdd />,
  },
];
