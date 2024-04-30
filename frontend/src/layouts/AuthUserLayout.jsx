import { memo, Fragment, useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Sidebar from '../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import { usePostFilterContext } from '../contexts/PostFilterContext';
const AuthUserLayout = memo(({}) => {
  const { activeTab } = usePostFilterContext();
  const [active, setActive] = useState(activeTab);
  return (
    <Fragment>
      <Header />
      <div className="grid grid-cols-8 gap-3 max-w-[1536px] mx-auto">
        <Sidebar active={active} setActive={setActive} item={0} />
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
});

export default AuthUserLayout;
