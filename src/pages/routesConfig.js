// import {
//   FaMoneyBill,
//   FaHandHoldingUsd,
//   FaHandshake,
//   FaLeaf,
// } from 'react-icons/fa';
// import {HiOfficeBuilding} from 'react-icons/hi';
import // RiCustomerService2Line,
// RiDashboardLine,
'react-icons/ri';
import {BsPeopleFill} from 'react-icons/bs';
// import {MdOutlineAnalytics} from 'react-icons/md';
// import {AiFillProject} from 'react-icons/ai';
import {FaHandshake} from 'react-icons/fa';
import {
  FaLeaf,
} from 'react-icons/fa';

const routesConfig = [
  {
    id: 'app',
    title: 'Application',
    messageId: 'Applications',
    type: 'group',
    children: [
      // {
      //   id: 'company_module',
      //   title: 'কোম্পানি ব্যবস্থাপনা',
      //   messageId: 'কোম্পানি ব্যবস্থাপনা',
      //   type: 'item',
      //   icon: <HiOfficeBuilding />,
      //   url: '/dashboards/company-module',
      // },
      {
        id: 'member_module',
        title: 'Vehicle Logs',
        messageId: 'Vehicle Logs',
        type: 'item',
        icon: <BsPeopleFill />,
        url: '/dashboards/member-module',
      },
      {
        id: 'rental_module',
        title: 'Add Vehicle',
        messageId: 'Add Vehicle',
        type: 'item',
        icon: <FaHandshake />,
        url: '/dashboards/rental-module',
      },
      // {
      //   id: 'project_module',
      //   title: 'প্রজেক্ট ব্যবস্থাপনা ',
      //   messageId: 'প্রজেক্ট ব্যবস্থাপনা',
      //   type: 'item',
      //   icon: <AiFillProject />,
      //   url: '/dashboards/project-module',
      // },
      // {
      //   id: 'vouchar_module',
      //   title: 'আয়-ব্যায় ব্যবস্থাপনা ',
      //   messageId: 'আয়-ব্যায় ব্যবস্থাপনা ',
      //   type: 'item',
      //   icon: <FaMoneyBill />,
      //   url: '/dashboards/income-expense-module',
      // },
      // {
      //   id: 'loan',
      //   title: 'কর্জে হাসনা ব্যবস্থাপনা ',
      //   messageId: 'কর্জে হাসনা ব্যবস্থাপনা',
      //   type: 'item',
      //   icon: <FaHandHoldingUsd />,
      //   url: '/dashboards/loan-module',
      // },
      {
        id: 'welfare',
        title: 'Add Payment',
        messageId: 'Add Payment',
        type: 'item',
        icon: <FaLeaf />,
        url: '/dashboards/welfare',
      },
      // {
      //   id: 'widgets',
      //   title: 'Widgets',
      //   messageId: 'sidebar.app.widgets',
      //   type: 'item',
      //   icon: <RiDashboardLine />,
      //   url: '/dashboards/widgets',
      // },
    ],
  },
];
export default routesConfig;
