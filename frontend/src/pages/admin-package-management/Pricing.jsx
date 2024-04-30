/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/display-name
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import PricingRow from "../../components/tableRow/PricingRow";
import PriceSettingModal from "../../components/priceSettingModal/priceSettingModal";
import LeftSideBar from "../user-detail/components/LeftSideBar";
import { useNavigate } from "react-router-dom";

const Pricing = memo(() => {
  const paymentURL = import.meta.env.VITE_BACKEND_API + "/services";
  const authToken = localStorage.getItem("token");
  const config = { Authorization: authToken };
  const configOfUpdate = {
    Authorization: authToken,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const navigate = useNavigate();
  const [payment, setPayment] = useState([]);
  const getPayment = async () => {
    try {
      await axios
        .get(`${paymentURL}`)
        .then((res) =>
          setPayment(res.data.sort((a, b) => a.category - b.category))
        );
    } catch (error) {
      const customError = new Error();
      customError.message = error.response.data.message;
      throw customError;
    }
  };
  useEffect(() => {
    getPayment();
  }, []);

  const [showModal, setShowModal] = useState({ isDisplay: false });

  const handleDeletedItem = (id) => {
    const deletePackage = async (pkgId) => {
      try {
        const response = await axios.delete(`${paymentURL}/${pkgId}`, {
          headers: config,
        });
      } catch (error) {
        const customError = new Error();
        customError.message = error.response.data.message;
        throw customError;
      }
    };
    deletePackage(id);
    setPayment(payment.filter((item) => item._id !== id));
  };
  const showModifyModal = (id) => {
    let originPrice = {};
    payment.some((item) => {
      if (item._id === id) {
        originPrice = item;
        return true;
      }
      return false;
    });
    setShowModal({ isDisplay: true, item: originPrice });
  };
  const handleModifyPrice = (pkg) => {
    const modifyPrice = async ({
      _id,
      daily_price,
      weekly_price,
      monthly_price,
    }) => {
      try {
        const response = await axios.patch(
          `${paymentURL}/${_id}`,
          { daily_price, weekly_price, monthly_price },
          {
            headers: configOfUpdate,
          }
        );
      } catch (error) {
        const customError = new Error();
        customError.message = error.response.data.message;
        throw customError;
      }
    };
    modifyPrice(pkg);
    setPayment(
      payment.map((item) => {
        if (item._id === pkg._id) return pkg;
        return item;
      })
    );
  };

  return (
    <div className="grid grid-cols-12">
      <LeftSideBar />
      <div className="w-auto col-start-3 col-span-10 h-[100vh] bg-[#e8f1fd]">
        <div className="pt-8 ml-8">
          <h2 className="font-bold text-3xl">
            Danh sách gói dịch vụ hỗ trợ đăng tin
          </h2>
          <div className="pr-8 mt-4">
            <div className="bg-white w-full rounded-xl py-4 px-4 relative min-h-[600px]">
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
                  <div className="col-span-1">STT</div>
                  <div className="col-span-3">Loại gói</div>
                  <div className="col-span-3">Giá ngày</div>
                  <div className="col-span-3">Giá tuần</div>
                  <div className="col-span-3">Giá tháng</div>
                  <div className="col-span-3">Thao tác</div>
                </div>
                {payment.map((item, index) => {
                  return (
                    <PricingRow
                      key={index}
                      rowItem={{ ...item, stt: index }}
                      handleDelete={handleDeletedItem}
                      handleModify={showModifyModal}
                    />
                  );
                })}
                {showModal.isDisplay ? (
                  <PriceSettingModal
                    setShowModal={setShowModal}
                    originPrice={showModal.item}
                    handleModifyPrice={handleModifyPrice}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Pricing;
