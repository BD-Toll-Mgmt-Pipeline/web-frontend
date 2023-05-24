import {FaRegHospital} from 'react-icons/fa';
import {HiOutlineAcademicCap} from 'react-icons/hi';
import {
  RiCustomerService2Line,
  // RiDashboardLine,

} from 'react-icons/ri';
import {
  BsCart4,
  BsCurrencyBitcoin,
} from 'react-icons/bs';
import {
  MdOutlineAnalytics,
} from 'react-icons/md';

const routesConfig = [
  {
    id: 'app',
    title: 'Application',
    messageId: 'sidebar.application',
    type: 'group',
    children: [
      {
        id: 'member_module',
        title: 'সদস্য  ব্যবস্থাপনা ',
        messageId: 'সদস্য  ব্যবস্থাপনা',
        type: 'item',
        icon: <BsCurrencyBitcoin />,
        url: '/dashboards/crypto',
      },
      {
        id: 'company_module',
        title: 'কোম্পানি ব্যবস্থাপনা',
        messageId: 'কোম্পানি ব্যবস্থাপনা',
        type: 'item',
        icon: <RiCustomerService2Line />,
        url: '/dashboards/crm',
      },
      {
        id: 'rental_module',
        title: 'ভাড়া ব্যবস্থাপনা',
        messageId: 'ভাড়া ব্যবস্থাপনা',
        type: 'item',
        icon: <MdOutlineAnalytics />,
        url: '/dashboards/analytics',
      },
      {
        id: 'project_module',
        title: 'প্রজেক্ট ব্যবস্থাপনা ',
        messageId: 'প্রজেক্ট ব্যবস্থাপনা',
        type: 'item',
        icon: <FaRegHospital />,
        url: '/dashboards/health-care',
      },
      {
        id: 'vouchar_module',
        title: 'ভাউচার ব্যবস্থাপনা ',
        messageId: 'ভাউচার ব্যবস্থাপনা ',
        type: 'item',
        icon: <BsCart4 />,
        url: '/dashboards/e-commerce',
      },
      {
        id: 'loan',
        title: 'কর্জে হাসনা ব্যবস্থাপনা ',
        messageId: 'কর্জে হাসনা ব্যবস্থাপনা',
        type: 'item',
        icon: <HiOutlineAcademicCap />,
        url: '/dashboards/academy',
      },
      // {
      //   id: 'metrics',
      //   title: 'Metrics',
      //   messageId: 'sidebar.app.metrics',
      //   type: 'item',
      //   icon: <HiOutlineChartSquareBar />,
      //   url: '/dashboards/metrics',
      // },
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
