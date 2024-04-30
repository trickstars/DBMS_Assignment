import { memo, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
const AdminLayout = memo(({}) => {
  return (
    <Fragment>
      <Sidebar />
      <Outlet />
    </Fragment>
  );
});

export default AdminLayout;
