import React from 'react';
import {RoutePermittedRole} from 'shared/constants/AppConst';
import EditMember from './MemberModule/EditMember/EditMember';
import NewRentalTypeAdd from './RentalModule/NewRentalTypeAdd/NewRentalTypeAdd';
import RentalReport from './RentalModule/RentalReport/RentalReport';
import PaymentVoucher from './VoucherModule/PaymentVoucher/PaymentVoucher';
import ReceiveVoucher from './VoucherModule/ReceiveVoucher/ReceiveVoucher';

const HealthCare = React.lazy(() => import('./HealthCare'));
const VoucherModule = React.lazy(() => import('./VoucherModule'));
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
    element: <VoucherModule />,
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
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/add-new-rental-type',
    element: <NewRentalTypeAdd />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/rental-report',
    element: <RentalReport />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/add-payment-voucher',
    element: <PaymentVoucher />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/add-receive-voucher',
    element: <ReceiveVoucher />,
  },
];
