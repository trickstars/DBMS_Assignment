import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePostFilterContext } from '../../contexts/PostFilterContext';


const baseURL = import.meta.env.VITE_BACKEND_API + '/users';


const Sidebar = ({ }) => {
  
  const authToken = localStorage.getItem('token');
  const config = { Authorization: authToken };
  const { activeTab, updateActiveTab } = usePostFilterContext();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    "username": "",
    "password": "",
    "role": "USER",
    "status": "ACTIVE",
    "email": "",
    "full_name": "",
    "phone": "",
    "avatar": "",
  });

  // const [active, setActive] = useState([0,0,0,0,0])
  const historyMoneny = () => {

    navigate('user/HistoryMoney');
  };
  const historyPayment = () => {

    navigate('user/payment-history');
  };
  const recharge = () => {
    navigate('user/Recharge');
  };
  const checkAuth = () => {
    if (authToken === null) navigate('/login');
  }

  const logoutUser = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getUser = async () => {
    console.log("get User")
    try {
      await axios.get(`${baseURL}/`, { headers: config }).then(res => setProfile(res.data));
    } catch (error) {
      const customError = new Error();
      customError.message = error.response.data.message;
      console.log(customError.message);
      // throw customError;
    }

  };
  useEffect(() => {
    checkAuth();
    // activeItem(props);
    getUser();
  }, [])

  return (
    <div className="font-semibold row-start-1 row-span-7 col-start-1 col-span-2 text-lg bg-[#F5F4F3]">
      <div className="py-8 grid grid-cols-2">
        <div className="ml-4 grid grid-cols-2 font-medium">
          <div className="w-20 h-20 rounded-full bg-white items-center overflow-hidden">
            <img src={profile.avatar} alt="avatar" className="w-full h-full" />
          </div>
          <div className="pl-3 pt-3 items-center justify-center">
            <div className="hover:cursor-pointer">{profile.username}</div>
            <div>{profile.phone}</div>
          </div>
        </div>
      </div>
      {/* <a href="./post-new"> */}
      <div className="text-[13px] font-medium">
        <Link to="/user/post-new" onClick={() => updateActiveTab(1)}>
          <div
            className={
              activeTab === 1
                ? 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item bg-[#E7E6EC]'
                : 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item'
            }
          >
            Đăng tin cho thuê
          </div>
        </Link>

        {/* </a> */}
        {/* <a href="./post-history"> */}
        <Link to="/user/post-history" onClick={() => updateActiveTab(2)}>
          <div
            className={
              activeTab === 2
                ? 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item bg-[#E7E6EC]'
                : 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item'
            }
          >
            Lịch sử cho thuê
          </div>
        </Link>
        {/* </a> */}
        {/* <a href="./profile"> */}
        <Link to="/user/profile" onClick={() => updateActiveTab(3)}>
          <div
            className={
              activeTab === 3
                ? 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item bg-[#E7E6EC]'
                : 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item'
            }
          >
            Thông tin cá nhân
          </div>
        </Link>
        {/* </a> */}
        {/* <a href="./recharge"> */}
        <Link
          to="/user/Recharge"
          state={{ profile, authToken }}
          onClick={() => updateActiveTab(4)}
        >
          <div
            onClick={recharge}
            className={
              activeTab === 4
                ? 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item bg-[#E7E6EC]'
                : 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item'
            }
          >
            Nạp tiền
          </div>
        </Link>
        {/* </a> */}
        {/* <a href="./HistoryMoney"> */}
        <Link
          to="/user/HistoryMoney"
          state={{ profile, authToken }}
          onClick={() => updateActiveTab(5)}
        >
          <div
            onClick={historyMoneny}
            className={
              activeTab === 5
                ? 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item bg-[#E7E6EC]'
                : 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item'
            }
          >
            Lịch sử nạp tiền
          </div>
        </Link>

        <Link to="/user/payment-history" onClick={() => updateActiveTab(6)}>
          <div
            className={
              activeTab === 6
                ? 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item bg-[#E7E6EC]'
                : 'my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item'
            }
          >
            Lịch sử thanh toán
          </div>
        </Link>

        {/* </a> */}
        <button onClick={logoutUser} className="w-full">
          <div className="text-start my-1 p-3 hover:cursor-pointer hover:bg-[#E7E6EC] item">
            Đăng xuất
          </div>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
