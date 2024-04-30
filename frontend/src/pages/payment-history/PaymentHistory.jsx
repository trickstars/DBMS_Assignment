import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_API + '/users/user/payments';

const PaymentHistory = () => {
    // const navigate = useNavigate()
    const authToken = localStorage.getItem('token')
    const config = {'Authorization': authToken};

    const [payments, setPayments] = useState([])

    const getPayments = async () => {
        console.log("get Payments")
        await axios.get(`${baseURL}`, {headers: config}).then(res => {
            console.log(res.data);
            setPayments(res.data);
        });
    };

    useEffect(() => {
        getPayments();
        console.log(payments);
    },[])

    return (
            <div className="col-start-3 col-span-8  gap-3 ">
                <div className="flex flex-col row-start-1 row-span-7 col-start-3 col-span-6 ml-5 mb-10">
                    <div className="px-3 py-4 mt-6 border-b border-gray rounded-md h-fit text-5xl">
                        Lịch sử thanh toán
                    </div>
                    <table className="mt-4 text-center mr-10 table-auto border-collapse border border-slate-300">
                        <thead className="grid grid-cols-16 font-bold rounded-[4px]">
                            <th className=" border border-slate-300 col-span-4 p-1">Ngày thanh toán</th>
                            <th className=" border border-slate-300 col-span-5 p-1">Mã tin đăng</th>
                            <th className=" border border-slate-300 col-span-4 p-1">Phí</th>
                            <th className=" border border-slate-300 col-span-3 p-1">Trạng thái</th>
                        </thead>
                        <tbody>
                        {
                            (payments.length > 0) ? payments.map((payment, idx) => {
                                return (
                                    <tr className="grid grid-cols-16 font-bold rounded-[4px]" key={idx}>
                                        <td className=" border border-slate-300 col-span-4 p-1">{payment.createdAt}</td>
                                        <td className=" border border-slate-300 col-span-5 p-1">{payment.post}</td>
                                        <td className=" border border-slate-300 col-span-4 p-1">{payment.fee}</td>
                                        <td className=" border border-slate-300 col-span-3 p-1">{payment.status}</td>
                                    </tr>
                                )
                            })
                            : <div className="py-2">Bạn chưa thanh toán</div>
                        }
                        </tbody>


                    </table>
                </div>
            </div>

    );
}
export default PaymentHistory;