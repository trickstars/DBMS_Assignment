import { useForm } from "react-hook-form";
import { RiAlertFill } from "react-icons/ri";
// eslint-disable-next-line react/prop-types
const PriceSettingModal = ({ setShowModal, originPrice,handleModifyPrice }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: originPrice,
  });
  const onSubmit = (data) => {
    handleModifyPrice(data);
    setShowModal({isDisplay:false});
  };

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative md:lg-1/3 lg:w-1/4 my-6 mx-auto max-w-3xl ">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-teal-50 outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold">Chỉnh sửa giá cả gói</h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() => setShowModal({isDisplay:false})}
            >
              <span className="text-black opacity-7 leading-[1.5rem] h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full hover:scale-105 hover:bg-blue-600">
                x
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <form
              className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="block text-black text-sm font-bold mb-1">
                Giá ngày
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                type="number"
                {...register("daily_price", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
              {errors?.daily_price?.type === "required" && (
                <p className="text-red-600 font-light">
                  {" "}
                  <RiAlertFill className="inline" /> Vui lòng không để trống giá
                  ngày!
                </p>
              )}
              {errors?.daily_price?.type === "pattern" && (
                <p className="text-red-600 font-light">
                  {" "}
                  <RiAlertFill className="inline" /> Dữ liệu nhập vào không phải
                  số nguyên dương!
                </p>
              )}
              <label className="block text-black text-sm font-bold mt-2 mb-1">
                Giá tuần
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                type="number"
                {...register("weekly_price", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
              {errors?.weekly_price?.type === "required" && (
                <p className="text-red-600 font-light">
                  {" "}
                  <RiAlertFill className="inline" /> Vui lòng không để trống giá
                  ngày!
                </p>
              )}
              {errors?.weekly_price?.type === "pattern" && (
                <p className="text-red-600 font-light">
                  {" "}
                  <RiAlertFill className="inline" /> Dữ liệu nhập vào không phải
                  số nguyên dương!
                </p>
              )}
              <label className="block text-black text-sm font-bold mt-2 mb-1">
                Giá tháng
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                type="number"
                {...register("monthly_price", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
              {errors?.monthly_price?.type === "required" && (
                <p className="text-red-600 font-light">
                  {" "}
                  <RiAlertFill className="inline" /> Vui lòng không để trống giá
                  ngày!
                </p>
              )}
              {errors?.monthly_price?.type === "pattern" && (
                <p className="text-red-600 font-light">
                  {" "}
                  <RiAlertFill className="inline" /> Dữ liệu nhập vào không phải
                  số nguyên dương!
                </p>
              )}

              <div className="flex items-center justify-end p-6">
                <button
                  className="text-red-500 hover:scale-105 border border-blue-300 rounded-md background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowModal({isDisplay:false})}
                >
                  Đóng
                </button>
                <button
                  className="text-white bg-[#25BEB9] font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="submit"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSettingModal;
