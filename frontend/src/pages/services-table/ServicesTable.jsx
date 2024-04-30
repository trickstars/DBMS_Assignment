
import axios from 'axios';
import {useState, useEffect} from 'react';

const servicesURL = import.meta.env.VITE_BACKEND_API + '/services';

const ServicesTable = () => {

    const [services , setServices] = useState([''])
    const avantages = [
        "- Lượt xem nhiều gấp 30 lần so với tin thường",
        "- Ưu việt, tiếp cận tối đa khách hàng.",
        "- Xuất hiện vị trí đầu tiên ở trang chủ",
        "- Đứng trên tất cả các loại tin VIP khác",
        "- Xuất hiện đầu tiên ở mục tin nổi bật xuyên suốt khu vực chuyên mục đó.",
        "- Lượt xem nhiều gấp 30 lần so với tin thường",
        "- Phù hợp khách hàng là công ty/cá nhân sở hữu hệ thống lớn có từ 15-20 căn phòng/nhà trở lên hoặc phòng trống quá lâu, thường xuyên đang cần cho thuê gấp.",
    ]

    const suitable = [
        "- Phù hợp khách hàng là công ty/cá nhân sở hữu hệ thống lớn có từ 15-20 căn phòng/nhà trở lên hoặc phòng trống quá lâu, thường xuyên đang cần cho thuê gấp."
    ]

    const getServices = async () => {
        console.log("get Services")
        await axios.get(`${servicesURL}`).then(res => setServices(res.data));


    };

    useEffect(() => {
        getServices();
    }, [])
    return (
    <div className="">
        <div className="max-w-[1536px] mx-auto m-10">
            <p className="font-bold text-center text-3xl">Bảng giá dịch vụ</p>
            <table className="table-auto border-collapse border border-slate-300 flex mt-10">
                <thead className="grid font-bold rounded-[4px] bg-[#ffff] w-1/6">
                    <td className="grid grid-row-16 font-bold rounded-[4px]">
                        <tr className="m-2 bg-[#9DC4FF] justify-center items-center flex p-3 px-10">
                            <span className="text-[#fff]">Loại</span>
                        </tr>
                        <tr className="m-2 bg-[#9DC4FF] justify-center items-center flex p-3 px-10 h-96">
                            <span className="text-[#fff]">Ưu điểm</span>
                        </tr>
                        <tr className="m-2 bg-[#9DC4FF] justify-center items-center flex p-3 px-10 h-48">
                            <span className="text-[#fff]">Phù hợp</span>
                        </tr>
                        <tr className="m-2 bg-[#9DC4FF] justify-center items-center flex p-3 px-10 h-12">
                            <span className="text-[#fff]">Giá ngày</span>
                        </tr>
                        <tr className="m-2 bg-[#9DC4FF] justify-center items-center flex p-3 px-10 h-12">
                            <span className="text-[#fff]">Giá tuần</span>
                        </tr>
                        <tr className="m-2 bg-[#9DC4FF] justify-center items-center flex p-3 px-10 h-12">
                            <span className="text-[#fff]">Giá tháng</span>
                        </tr>
                    </td>
                </thead>
                <tbody className="flex justify-around w-5/6">
                {services.length ? services.map((item, idx)=> {
                    return (
                        <td key={idx} className="grid">
                            <tr className="m-2 border border-slate-300 p-3 bg-[#FF4E4E]">
                                <span className="text-[#fff] w-full">VIP {item.category}</span>
                            </tr>
                            <tr className="m-2 border border-slate-300 p-3 bg-[#F3F4FF] h-96">
                                <span className="text-[#000] w-full">
                                    <p>{avantages[0]}</p>
                                    <p>{avantages[1]}</p>
                                    <p>{avantages[2]}</p>
                                    <p>{avantages[3]}</p>
                                    <p>{avantages[4]}</p>
                                    <p>{avantages[5]}</p>
                                </span>
                            </tr>
                            <tr className="m-2 border border-slate-300 p-3 bg-[#F3F4FF] h-48">
                                <span className="text-[#000] w-full">
                                    <p>{suitable[0]}</p>
                                </span>
                            </tr>
                            <tr className="m-2 border border-slate-300 p-3 bg-[#F3F4FF] h-12">
                                <span className="text-[#000] w-full">{item.daily_price} đồng/ ngày</span>
                            </tr>
                            <tr className="m-2 border border-slate-300 p-3 bg-[#F3F4FF] h-12">
                                <span className="text-[#000] w-full">{item.weekly_price} đồng/ tuần</span>
                            </tr>
                            <tr className="m-2 border border-slate-300 p-3 bg-[#F3F4FF] h-12">
                                <span className="text-[#000] w-full">{item.monthly_price} đồng/ tháng</span>
                            </tr>
                        </td>
                    )
                }):""}
                </tbody>
            </table>

            {/* <div className="flex self-center justify-between mt-8">
                <div className="w-1/5 h-24 bg-[#ffff] justify-center items-center flex m-2">
                    <span className="text-[#fff]"></span>
                </div>
                <div className="w-1/5 h-24 bg-[#FF0000] justify-center items-center flex m-2">
                    <span className="text-[#fff]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#FF0000] justify-center items-center flex m-2">
                    <span className="text-[#fff]">VIP 2</span>
                </div>
                <div className="w-1/5 h-24 bg-[#FF0000] justify-center items-center flex m-2">
                    <span className="text-[#fff]">VIP 3</span>
                </div>
                <div className="w-1/5 h-24 bg-[#FF0000] justify-center items-center flex m-2">
                    <span className="text-[#fff]">VIP 4</span>
                </div>
            </div>

            <div className="flex self-center justify-between">
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">Ưu điểm</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
            </div>

            <div className="flex self-center justify-between">
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">Phù hợp</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
            </div>

            <div className="flex self-center justify-between">
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">Giá ngày</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
            </div>

            <div className="flex self-center justify-between">
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">Giá tuần</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
            </div>

            <div className="flex self-center justify-between">
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">Giá tháng</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
                <div className="w-1/5 h-24 bg-[#ccc] justify-center items-center flex mx-2 my-1">
                    <span className="text-[#000]">VIP 1</span>
                </div>
            </div> */}
        </div>

    </div>
    )
}
export default ServicesTable;