/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/display-name
import { memo, useState,useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import AdminPagination from "../../components/adminPagination/AdminPagination";
import UserRow  from "../../components/tableRow/UserRow";
import LeftSideBar from "../user-detail/components/LeftSideBar";
import axios from "axios";

const accURL = import.meta.env.VITE_BACKEND_API + "/admin/user";
const authToken = localStorage.getItem("token");
const config = { Authorization: authToken };

const UserList = memo(() => {
  const [pageNum, setPageNum] = useState(()=>{
    let pageNo = localStorage.getItem("postPage");
    return pageNo?pageNo:1;
  });

  const [accounts, setAccounts] = useState({});
  const getAccounts = async (pageNum) => {
    try {
      await axios
        .get(`${accURL}?page=${pageNum}`, { headers: config })
        .then((res) => {
          setAccounts(res.data);
        });
    } catch (error) {
      const customError = new Error();
      customError.message = error.response.data.message;
      throw customError;
    }
  };
  useEffect(() => {
    getAccounts(pageNum);
    localStorage.removeItem("postPage");
  }, [pageNum]);
  console.log(accounts);
  const handlePageChange = (newPage) => {
    setPageNum(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleDeletedItem = (id) => {
    let temp = accounts?.users?.filter((item) => item._id !== id);
    setAccounts({totalUsers:accounts.totalUsers-1,users:temp});
  };
  return (
    <div className="grid grid-cols-12">
      <LeftSideBar />
      <div className="w-auto col-start-3 col-span-10 h-[100vh] bg-[#e8f1fd]">
        <div className="pt-8 ml-8">
          <h2 className="font-bold text-3xl">Danh sách người dùng</h2>
          <div className="pr-8 mt-4">
            <div className="bg-white w-full rounded-xl py-4 px-4 relative min-h-[600px] pb-36">
              <div className="flex flex-row-reverse">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Tìm kiếm
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <IoSearchOutline className="w-6 h-6 text-black" />
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                      placeholder="Tìm kiếm nội dung ở đây..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-full px-7 ms-3 text-sm font-medium text-white bg-[#25BEB9] rounded-lg hover:scale-105 transition focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Tìm kiếm
                  </button>
                </form>
              </div>
              <div className="mt-4 text-center">
                <div className="grid grid-cols-16 font-bold bg-[#b6d6f2] rounded-xl py-2">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-4">Họ tên</div>
                  <div className="col-span-4">Tên đăng nhập</div>
                  <div className="col-span-3">Email</div>
                  <div className="col-span-1">Vai trò</div>
                  <div className="col-span-1">Trạng thái</div>
                  <div className="col-span-2">Thao tác</div>
                </div>
                {
                accounts?.users?.map((item, index) => {
                  return (
                    <UserRow
                      key={index}
                      rowItem={{...item,id:index}}
                      handleDeletedItem={handleDeletedItem}
                    />
                  );
                })
                }
              </div>
              <div className="my-4 absolute bottom-0 left-0 right-0">
                <span className="ml-4">
                  Hiển thị 1 đến {accounts?.users?.length} của {accounts?.users?.length}{" "}
                  mục
                </span>
                <div className="flex justify-center text-center">
                  <AdminPagination
                    handleChange={handlePageChange}
                    pageStatus={pageNum}
                    maxPage = {Math.ceil(accounts.totalUsers/7)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default UserList;
