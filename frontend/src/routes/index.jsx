import { createBrowserRouter } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import AuthUserLayout from '../layouts/AuthUserLayout';
// import AdminLayout from '../layouts/AdminLayout';
import ErrorPage from '../pages/error/Error';
import HomePage from '../pages/home/Home';
import LoginPage from '../pages/login/Login';
import RegisterPage from '../pages/register/Register';
import EnterEmailPage from '../pages/enter-email/EnterEmail';
import SendPasswordPage from '../pages/send-password/SendPassword';

import SavePost from '../pages/save-post/SavePost';
import PostDetail from '../pages/post-detail/PostDetail';

import PricingPage from '../pages/admin-package-management/Pricing';
import PostsPage from '../pages/admin-post-management/Posts';
import DetailPost from '../pages/admin-post-management/DetailPost';
import Statistics from '../pages/statistics/Statistics';
// import { PostFilterContextProvider } from '../contexts/PostFilterContext';

import HistoryMoney from '../pages/history-money/HistoryMoney';
import Recharge from '../pages/history-money/recharge';
import AddUser from '../pages/user-detail/AddUser';
import ChangePassWord from '../pages/user-detail/ChangePassword';
import UserInfo from '../pages/user-detail/UserInfo';

import UserList from '../pages/manage-user/UserList';
import PostHistory from '../pages/post-history/PostHistory';
import Profile from '../pages/profile/Profile';
import PostNew from '../pages/post-new/PostNew';
import ServicesTable from '../pages/services-table/ServicesTable';
import PaymentHistory from '../pages/payment-history/PaymentHistory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    // (
    //   <PostFilterContextProvider>
    //     <UserLayout />
    //   </PostFilterContextProvider>
    // ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/save-post',
        element: <SavePost />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/post-detail/:id',
        element: <PostDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/services',
        element: <ServicesTable />,
      },
    ],
  },
  {
    path: '/user',
    element: <AuthUserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'post-new',
        element: <PostNew />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'post-history',
        element: <PostHistory />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'profile',
        element: <Profile />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'HistoryMoney',
        element: <HistoryMoney />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'Recharge',
        element: <Recharge />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'payment-history',
        element: <PaymentHistory />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/enter-email',
    element: <EnterEmailPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/send-password',
    element: <SendPasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'admin/userlist',
    element: <UserList />,
  },
  {
    path: 'admin/user/add-user',
    element: <AddUser />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'admin/user/changepassword',
    element: <ChangePassWord />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'admin/userInfo',
    element: <UserInfo />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'admin/user',
    element: <UserInfo />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'admin/pricing',
    element: <PricingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'admin/posts',
    element: <PostsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'admin/posts/detail',
    element: <DetailPost />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/pricing',
    element: <PricingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'admin/statistics',
    element: <Statistics />,
    errorElement: <ErrorPage />,
  },
  // Admin routes will be updated soon
]);

export default router;
