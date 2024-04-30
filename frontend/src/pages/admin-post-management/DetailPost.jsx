import { memo, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Carousel from "../../components/admin/Carousel";
import Gallery from "../../components/admin/Gallery";
import LeftSideBar from "../user-detail/components/LeftSideBar";


// eslint-disable-next-line react/display-name
const DetailPost = memo(() => {
  const postURL = import.meta.env.VITE_BACKEND_API + "/posts";
  const authToken = localStorage.getItem("token");
  const config = { Authorization: authToken };
  const [detailPost, setDetailPost] = useState({});
  const navigate = useNavigate();
  let { state } = useLocation();
  let post = state; // Sau này sẽ sử dụng biến post
  
  localStorage.setItem("postPage", post.page);
  const acceptPost = async (id) => {
    try {
      const response = await axios.patch(`${postURL}/${id}/accept`, null, {
        headers: config,
      });
      console.log("Run accept post: ", response.data);
    } catch (error) {
      const customError = new Error();
      customError.message = error.response.data.message;
      throw customError;
    }
  };
  const rejectPost = async (id) => {
    try {
      const response = await axios.patch(`${postURL}/${id}/reject`, null, {
        headers: config,
      });
      console.log("Run reject post: ", response.data);
    } catch (error) {
      const customError = new Error();
      customError.message = error.response.data.message;
      throw customError;
    }
  };
  const getDetailPost = async (id) => {
    try {
      const response = await axios.post(
        `${postURL}`,
        { postId: id },
        {
          headers: config,
        }
      );
      console.log("Run detail post: ", response.data);
      setDetailPost(response.data);
    } catch (error) {
      const customError = new Error();
      customError.message = error.response.data.message;
      throw customError;
    }
  };
  const handleVerify = () => {
    acceptPost(post._id);
    setTimeout(() => {
      navigate("../admin/posts");
    }, 2000);
  };
  const handleReject = () => {
    rejectPost(post._id);
    setTimeout(() => {
      navigate("../admin/posts");
    }, 2000);
  };
  useEffect(() => {
    getDetailPost(post._id);
  }, []);
  const formatNumber = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div className="grid grid-cols-12">
      <LeftSideBar />
      <div className="w-auto col-start-3 col-span-10 bg-[#e8f1fd] p-0 m-0 box-border">
        <div className="p-8 ml-8">
          <h2 className="font-bold text-3xl">
            <Link
              to={"../admin/posts"}
              className="underline hover:text-blue-600"
            >
              Danh sách bài đăng
            </Link>{" "}
            / Chi tiết
          </h2>
          <div className="pr-8 mt-4">
            <div className="text-right text-md md:text-2xl mb-2">
              <button
                className={`${
                  post.status === "PENDING" ? "" : "hidden"
                } py-2 px-8 bg-[#25BEB9] text-white mr-8 rounded-2xl hover:scale-105 transition`}
                onClick={handleVerify}
              >
                Xác nhận
              </button>
              <button
                className={`${
                  post.status === "PENDING" ? "" : "hidden"
                } py-2 px-8 bg-red-600 text-white mr-4 rounded-2xl hover:scale-105 transition`}
                onClick={handleReject}
              >
                Từ chối
              </button>
            </div>
            <div>
              <div className="md:grid md:grid-cols-12 md:gap-8 mb-4 ">
                <div className="md:col-span-5 lg:col-span-4">
                  <div className="md:h-full">
                    <div className={`w-full h-80 md:h-[60%]`}>
                      <Carousel slides={detailPost.assets}/>
                    </div>
                    <div className={`hidden ${detailPost?.assets?.length>2?'md:block':''} md:h-[25%] md:mt-2`}>
                      <Gallery slides={detailPost.assets}/>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-7 lg:col-span-8">
                  <div className="mt-2 md:mt-0">
                    <div className="text-red-600 text-2xl mb-4">
                      <p>{detailPost.title}</p>
                    </div>
                    <p className="mb-4">
                      Diện tích: {detailPost.area} m<sup>2</sup> <br />
                      Kiểu: {detailPost?.type}
                    </p>
                    <p className="text-red-600 font-bold text-3xl mb-4">
                      {formatNumber(detailPost.price)}<sup>đ</sup>
                    </p>
                    <div className="bg-white rounded-lg p-4 lg:p-8">
                      <p className="font-bold mb-4 text-3xl">Người đăng bài</p>
                      <div className="md:grid md:grid-rows-2 md:grid-cols-2 mb-4 md:gap-4">
                        <div>
                          <p className="font-semibold">Họ tên</p>
                          <p className="text-sm">{detailPost.created_by?.full_name}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Địa chỉ</p>
                          <p className="text-sm">{detailPost?.full_address?.street_address}, {detailPost?.full_address?.ward}, {detailPost?.full_address?.district}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Địa điểm</p>
                          <p className="text-sm">Tp. Hồ Chí Minh</p>
                        </div>
                        <div>
                          <p className="font-semibold">Phone</p>
                          <p className="text-sm">0{detailPost?.phone_num?.replace(/,/g, ' ')}</p>
                        </div>
                      </div>
                      <div>
                        <button className="w-full block rounded-lg bg-gray-400 py-2">
                          Liên hệ người đăng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg">
                <p className="font-bold text-2xl text-[#25BEB9]">Mô tả thêm</p>
                <p>{detailPost?.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DetailPost;
