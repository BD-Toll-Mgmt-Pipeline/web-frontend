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
import AddNewIcomeType from './IncomeExpenseModule/AddnewIconeType/AddnewIncomeType';
import NewLoanAdd from './LoanModule/NewLoanAdd/NewLoanAdd';
import Welfare from './WelfareModule';
import NewProjectAdd from './ProjectModule/NewProjectAdd/NewProjectAdd';
import ProjectDetails from './ProjectModule/ProjectDetails/ProjectDetails';
import EditProject from './ProjectModule/EditProject/EditProject';
import EditLoan from './LoanModule/EditLoan/EditLoan';
import LoanDetails from './LoanModule/LoanDetails/LoanDetails';
import WelfareReport from './WelfareModule/WelfareReport/WelfareReport';
import EditPaymentVoucher from './IncomeExpenseModule/EditPaymentVoucher/EditPaymentVoucher';

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
    path: '/dashboards/loan-module',
    element: <Academy />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/rental-module',
    element: <RentalModule />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/income-expense-module',
    element: <VoucherModule />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/company-module',
    element: <CRM />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/project-module',
    element: <HealthCare />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/member-module',
    element: <MemberModule />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/member-module/add-new-member',
    element: <NewMemberAdd />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/edit-member/:id',
    element: <EditMember />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/rental-module/rental-module/add-new-rental',
    element: <NewRentalAdd />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/rental-module/add-new-rental-type',
    element: <NewRentalTypeAdd />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/project-module/rental-report',
    element: <RentalReport />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/income-expense-module/add-payment-voucher',
    element: <IncomeVoucher />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/edit-payment-voucher/:id',
    element: <EditRoshid />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/income-expense-module/add-receive-voucher',
    element: <PaymentVoucher />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/edit-voucher/:id',
    element: <EditPaymentVoucher />,
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
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/income-expense-module/add-new-income-type',
    element: <AddNewIcomeType />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/loan-module/add-new-loan-request',
    element: <NewLoanAdd />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/edit-loan-request/:id',
    element: <EditLoan />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboard/loan-details/:id',
    element: <LoanDetails />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/welfare',
    element: <Welfare />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/welfare/welfare-report',
    element: <WelfareReport />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/project-module/add-new-project',
    element: <NewProjectAdd />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/project-details/:id',
    element: <ProjectDetails />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: '/dashboards/edit-project/:id',
    element: <EditProject />,
  },
];
