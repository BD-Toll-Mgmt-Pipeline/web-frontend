import React from 'react';
import {RoutePermittedRole} from 'shared/constants/AppConst';
import EditMember from './MemberModule/EditMember/EditMember';
import MemberDetails from './MemberModule/MemberDetails/MemberDetails';
import NewRentalTypeAdd from './RentalModule/NewRentalTypeAdd/NewRentalTypeAdd';
import RentalDetails from './RentalModule/RentalDetails/RentalDetails';
import RentalReport from './RentalModule/RentalReport/RentalReport';
import IncomeVoucher from './IncomeExpenseModule/IncomeVoucher/IncomeVoucher';
import PaymentVoucher from './IncomeExpenseModule/PaymentVoucher/PaymentVoucher';
import EditRoshid from './IncomeExpenseModule/EditRoshid/EditRoshid';


const HealthCare = React.lazy(() => import('./ProjectModule'));
const VoucherModule = React.lazy(() => import('./IncomeExpenseModule'));
const CRM = React.lazy(() => import('./CompanyModule'));
const MemberModule = React.lazy(() => import('./MemberModule'));
const RentalModule = React.lazy(() => import('./RentalModule'));
const Academy = React.lazy(() => import('./LoanModule'));
const NewMemberAdd = React.lazy(() =>
  import('../dashboards/MemberModule/NewMemberAdd/NewMemberAdd'),
);
const NewRentalAdd = React.lazy(() =>
  import('../dashboards/RentalModule/NewRentalAdd/NewRentalAdd'),
);

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
    element: <IncomeVoucher />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/edit-payment-voucher/:id',
    element: <EditRoshid />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/add-receive-voucher',
    element: <PaymentVoucher />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/member-details/:id',
    element: <MemberDetails />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/rental-details/:id',
    element: <RentalDetails />,
  },
];
