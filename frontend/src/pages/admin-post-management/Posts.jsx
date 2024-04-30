/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/display-name
import { memo, useState, useEffect } from "react";

import { IoSearchOutline } from "react-icons/io5";
import AdminPagination from "../../components/adminPagination/AdminPagination";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiSolidDetail } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LeftSideBar from "../user-detail/components/LeftSideBar";
import axios from "axios";


const Posts = memo(() => {
  const postURL = import.meta.env.VITE_BACKEND_API + "/admin/post";
  const authToken = localStorage.getItem("token");
  const config = { Authorization: authToken };
  const [renderedPost, setRenderedPost] = useState({});
  const [postsAdmin, setPostsAdmin] = useState({});
  const [pageNum, setPageNum] = useState(()=>{
    let pageNo = localStorage.getItem("postPage");
    return pageNo?pageNo:1;
  });
  const getPosts = async (pageNum) => {
    try {
      await axios
        .get(`${postURL}?page=${pageNum}`, { headers: config })
        .then((res) => {
          setPostsAdmin(res.data);
          setRenderedPost(res.data);
        });
    } catch (error) {
      const customError = new Error();
      customError.message = error.response.data.message;
      throw customError;
    }
  };
  useEffect(() => {
    getPosts(pageNum);
    localStorage.removeItem("postPage");
  }, [pageNum]);
  const [seletedFilter, setSelectedFilter] = useState("All");
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    setPageNum(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setSelectedFilter("All");
  };

  const handleDeletedItem = (e,id) => {
    e.stopPropagation();
    let temp = renderedPost?.posts?.filter((item) => item._id !== id);
    setRenderedPost({totalPosts:temp.length,posts:temp});
  };

  const handleFilter = (filterType) => {
    setSelectedFilter(filterType);
    if (filterType !== seletedFilter) {
      if (filterType === "All") {
        setRenderedPost(postsAdmin);
      } else {
        let filteredPosts = postsAdmin.posts.filter((item) => {
          return item.status === filterType;
        });
        setRenderedPost({
          totalPosts: filteredPosts.length,
          posts: filteredPosts,
        });
      }
    }
  };
  const formatDate = (originDate) => {
    const date = new Date(originDate);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    return formattedDate;
  };
  //CSS Style variable
  const activeFilter = "bg-[#25BEB9] text-white";
  const noActiveFilter =
    "hover:bg-[#25BEB9] hover:bg-opacity-50 hover:text-white border border-[#25BEB9]";

  return (
    <div className="grid grid-cols-12">
      <LeftSideBar />
      <div className="w-auto col-start-3 col-span-10 pb-8 bg-[#e8f1fd]">
        <div className="pt-8 ml-8">
          <h2 className="font-bold text-3xl">Danh sách bài đăng</h2>
          <div className="pr-8 mt-4">
            <div className="bg-white w-full rounded-xl py-4 px-4 relative min-h-[600px]">
              <div className="flex justify-between flex-col md:flex-row">
                <div className="w-full md:w-1/2 lg:w-1/3 flex justify-between flex-col md:flex-row mb-2 md:mb-0">
                  <button
                    className={`rounded-lg mb-1 md:mb-0 md:px-2 lg:px-5 ml-2 md:ml-0 ${
                      seletedFilter === "All" ? activeFilter : noActiveFilter
                    }`}
                    onClick={() => {
                      handleFilter("All");
                    }}
                  >
                    Tất cả
                  </button>
                  <button
                    className={`rounded-lg mb-1 md:mb-0 md:px-2 lg:px-5 ${
                      seletedFilter === "PENDING"
                        ? activeFilter
                        : noActiveFilter
                    } ml-2`}
                    onClick={() => {
                      handleFilter("PENDING");
                    }}
                  >
                    Đang chờ
                  </button>
                  <button
                    className={`rounded-lg mb-1 md:mb-0 md:px-2 lg:px-5 ${
                      seletedFilter === "ACCEPTED"
                        ? activeFilter
                        : noActiveFilter
                    } ml-2`}
                    onClick={() => {
                      handleFilter("ACCEPTED");
                    }}
                  >
                    Đã xác nhận
                  </button>
                </div>
                <div className="flex md:ml-2">
                  <form className="flex items-center w-full">
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                        placeholder="Tìm kiếm nội dung ở đây..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-full px-2 md:px-7 ms-3 text-sm font-medium text-white bg-[#25BEB9] rounded-lg hover:scale-105 transition focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Tìm kiếm
                    </button>
                  </form>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="grid grid-cols-16 font-bold bg-[#b6d6f2] rounded-xl py-2 text-sm md:text-xl">
                  <div className="hidden md:col-span-1 md:block">ID</div>
                  <div className="col-span-3">Tên bài đăng</div>
                  <div className="col-span-2">Người đăng</div>
                  <div className="col-span-3">Ngày đăng</div>
                  <div className="col-span-3">Địa điểm</div>
                  <div className="col-span-2">Trạng thái</div>
                  <div className="col-span-2">Thao tác</div>
                </div>
                {renderedPost?.posts?.length
                  ? renderedPost.posts.map((post, idx) => {
                      return (
                        <div
                          className="grid grid-cols-16 py-2 text-xs md:text-xl md:hover:bg-blue-100 hover:rounded-lg"
                          key={idx}
                          onClick={() =>
                            navigate("../admin/posts/detail", {
                              state: { ...post, page: pageNum },
                            })
                          }
                        >
                          <div className="hidden md:col-span-1 md:block">
                            {idx + 1}
                          </div>
                          <div className="col-span-4 md:col-span-3 text-left">
                            {post.title}
                          </div>
                          <div className="col-span-2">
                            {post.created_by.full_name}
                          </div>
                          <div className="col-span-3">
                            {formatDate(post.createDate)}
                          </div>
                          <div className="col-span-3">
                            Quận {post.full_address.district}
                          </div>
                          <div className="col-span-3 md:col-span-2">
                            {" "}
                            <span
                              className={`${
                                post?.status == "ACCEPTED"
                                  ? "bg-[#59d9cc]"
                                  : post?.status == "PENDING"
                                  ? "bg-[#f5a201]"
                                  : "bg-red-700"
                              } text-white px-1 lg:px-4 md:text-sm lg:py-1 inline-block rounded-sm lg:rounded-xl`}
                            >
                              {post.status}
                            </span>
                          </div>
                          <div className="col-span-1 md:col-span-2 flex justify-center">
                            <Link
                              to={"../admin/posts/detail"}
                              state={{ ...post, page: pageNum }}
                            >
                              <BiSolidDetail className="hidden lg:block mr-1 md:mr-2 lg:mr-4 w-6 h-6 cursor-pointer hover:scale-105 hover:text-[rgb(57,197,200)]" />
                            </Link>
                            <BsFillTrash3Fill
                              onClick={(e) => {handleDeletedItem(e,post._id)}}
                              className="mt-[-4px] md:mt-0 w-6 h-6 cursor-pointer hover:scale-105 hover:text-[rgb(57,197,200)]"
                            />
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
              <div className="mt-8 lg:mt-12">
                <span className="ml-4">
                  Hiển thị {(pageNum===1)?1:((pageNum-1)*7)} đến {(pageNum*7)>renderedPost.totalPosts?renderedPost.totalPosts:pageNum*7} của{" "}
                  {renderedPost.totalPosts} mục
                </span>
                <div className="flex justify-center text-center">
                  <AdminPagination
                    handleChange={handlePageChange}
                    pageStatus={pageNum}
                    maxPage = {Math.ceil(renderedPost.totalPosts/7)}
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

export default Posts;
