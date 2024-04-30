import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';



const HistoryMoney = () => {
  const baseURL = import.meta.env.VITE_BACKEND_API + '/users';
  const authToken = localStorage.getItem('token');
  const config = { Authorization: authToken };
  const url = `https://bkhostel.hcmut.tech/users/`;
  const { state } = useLocation();
  // console.log(state.profile);
  const [infoUser, setInfoUser] = useState([]);
  const [alert, setAlert] = useState('');
  const getUser = async () => {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      // setInfoUser(res.data);
      console.log(res.data);
      getData(res.data._id);
      console.log(res.data._id);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getData = async (id) => {
    try {
      const res = await axios.get(
        `https://bkhostel.hcmut.tech/recharge/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setInfoUser(res.data);
      if (infoUser.length == 0) setAlert('Không tìm thấy dữ liệu');
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col row-start-1 row-span-7 col-start-3 col-span-6 ">
      <div className="px-3 py-4 mt-6 border-b border-gray rounded-md h-fit text-5xl mb-6">
        LỊCH SỬ NẠP TIỀN
      </div>
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 border-2">
        <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 border-b-2 border-r-2">
              Ngày nạp tiền
            </th>
            <th scope="col" className="px-6 py-3 border-b-2 border-r-2">
              Mã giao dịch
            </th>
            <th scope="col" className="px-6 py-3 border-b-2 border-r-2">
              Số tiền
            </th>
            <th scope="col" className="px-6 py-3 border-b-2 border-r-2">
              Phương thức
            </th>
            <th scope="col" className="px-6 py-3 border-b-2 border-r-2">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3 border-b-2 border-r-2">
              #
            </th>
          </tr>
        </thead>
        <tbody>
          {+infoUser.length === 0 ? (
            alert
          ) : (
            infoUser.map((user, i) => (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 grid-cols-6 border-r-2">
                  {user.date}
                </td>
                <td className="px-6 py-4 border-r-2">{user._id}</td>
                <td className="px-6 py-4 border-r-2">{user.amount}</td>
                <td className="px-6 py-4 border-r-2">{user.method}</td>
                <td className="px-6 py-4 border-r-2">{user.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default HistoryMoney;
