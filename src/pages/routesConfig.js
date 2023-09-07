import {
  FaMoneyBill,
  FaHandHoldingUsd,
  FaHandshake,
  FaLeaf,
} from 'react-icons/fa';
import {HiOfficeBuilding} from 'react-icons/hi';
import // RiCustomerService2Line,
// RiDashboardLine,
'react-icons/ri';
import {BsPeopleFill} from 'react-icons/bs';
// import {MdOutlineAnalytics} from 'react-icons/md';
import {AiFillProject} from 'react-icons/ai';

const routesConfig = [
  {
    id: 'app',
    title: 'Application',
    messageId: 'sidebar.application',
    type: 'group',
    children: [
      {
        id: 'company_module',
        title: 'কোম্পানি ব্যবস্থাপনা',
        messageId: 'কোম্পানি ব্যবস্থাপনা',
        type: 'item',
        icon: <HiOfficeBuilding />,
        url: '/dashboards/crm',
      },
      {
        id: 'member_module',
        title: 'সদস্য  ব্যবস্থাপনা ',
        messageId: 'সদস্য  ব্যবস্থাপনা',
        type: 'item',
        icon: <BsPeopleFill />,
        url: '/dashboards/crypto',
      },
      {
        id: 'rental_module',
        title: 'ভাড়া ব্যবস্থাপনা',
        messageId: 'ভাড়া ব্যবস্থাপনা',
        type: 'item',
        icon: <FaHandshake />,
        url: '/dashboards/analytics',
      },
      {
        id: 'project_module',
        title: 'প্রজেক্ট ব্যবস্থাপনা ',
        messageId: 'প্রজেক্ট ব্যবস্থাপনা',
        type: 'item',
        icon: <AiFillProject />,
        url: '/dashboards/health-care',
      },
      {
        id: 'vouchar_module',
        title: 'আয়-ব্যায় ব্যবস্থাপনা ',
        messageId: 'আয়-ব্যায় ব্যবস্থাপনা ',
        type: 'item',
        icon: <FaMoneyBill />,
        url: '/dashboards/e-commerce',
      },
      {
        id: 'loan',
        title: 'কর্জে হাসনা ব্যবস্থাপনা ',
        messageId: 'কর্জে হাসনা ব্যবস্থাপনা',
        type: 'item',
        icon: <FaHandHoldingUsd />,
        url: '/dashboards/academy',
      },
      {
        id: 'welfare',
        title: 'কল্যান তহবিল ',
        messageId: 'কল্যান তহবিল ',
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
